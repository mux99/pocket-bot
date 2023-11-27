export async function load({locals}) {

  const users = await locals.pool.query({
    text: `
    select username, win_lose_ratio 
    from user_statistics
    join users on user_statistics.user_id = users.user_id
    order by win_lose_ratio desc
    limit 100
    `,
  });
  
  return {
    users: users.rows
  }
}