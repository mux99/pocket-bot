import {writeFileSync, mkdirSync, existsSync} from 'fs'
import { json, redirect } from "@sveltejs/kit";

const DIR = 'static/profile-picture';

export async function POST({request, locals}) {
  if (!locals.userInfo)
    throw redirect(307, '/login');

  if (!existsSync(DIR))
    mkdirSync(DIR);
  writeFileSync(
    `${DIR}/${locals.userInfo.user_id}.png`,
    JSON.parse(await request.text()).image,
    'base64'
  );
  return json({status: 200});
}