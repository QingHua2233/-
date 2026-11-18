// Cloudflare Pages Function: each post has its own comment thread.
// Bind a D1 database as COMMENTS_DB and apply schema.sql before deployment.
const response = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
const validPost = post => typeof post === 'string' && /^\/blog\/[a-z0-9-]+\/?$/.test(post) ? post.replace(/\/$/, '') : null;
export async function onRequestGet({ request, env }) {
  const post = validPost(new URL(request.url).searchParams.get('post'));
  if (!post) return response({ error: '帖子地址无效' }, 400);
  if (!env.COMMENTS_DB) return response({ error: '评论服务尚未配置' }, 503);
  try {
    const result = await env.COMMENTS_DB.prepare('SELECT id, nickname, avatar, body, created_at FROM comments WHERE post = ? ORDER BY id DESC LIMIT 100').bind(post).all();
    return response({ comments: result.results });
  } catch { return response({ error: '评论暂时无法加载' }, 503); }
}
export async function onRequestPost({ request, env }) {
  if (!env.COMMENTS_DB) return response({ error: '评论服务尚未配置' }, 503);
  const origin = request.headers.get('Origin');
  if (!origin || origin !== new URL(request.url).origin) return response({ error: '请求来源无效' }, 403);
  if (!(request.headers.get('content-type') || '').includes('application/json')) return response({ error: '请求格式无效' }, 415);
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 160000) return response({ error: '头像图片过大' }, 413);
  let data; try { const raw = await request.text(); if (raw.length > 160000) return response({ error: '头像图片过大' }, 413); data = JSON.parse(raw); } catch { return response({ error: '请求格式无效' }, 400); }
  const post = validPost(data.post), nickname = typeof data.nickname === 'string' ? data.nickname.trim() : '', body = typeof data.body === 'string' ? data.body.trim() : '', avatar = data.avatar || '';
  if (!post || !nickname || nickname.length > 30 || !body || body.length > 1000 || typeof avatar !== 'string' || avatar.length > 140000 || (avatar && !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(avatar))) return response({ error: '请检查昵称、头像和评论内容' }, 400);
  try {
    await env.COMMENTS_DB.prepare('INSERT INTO comments (post, nickname, avatar, body) VALUES (?, ?, ?, ?)').bind(post, nickname, avatar, body).run();
    return response({ ok: true }, 201);
  } catch { return response({ error: '评论暂时无法保存' }, 503); }
}
