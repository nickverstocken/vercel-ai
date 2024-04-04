'use server'

import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { type Chat } from '@/lib/types'


export async function getChat(id: string) {
  console.log('get chat', id);
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  return chat
}


export async function saveChat(chat: Chat) {
  console.log('save chat', chat);
  // const session = await auth()

  // if (session && session.user) {
  //   const pipeline = kv.pipeline()
  //   pipeline.hmset(`chat:${chat.id}`, chat)
  //   pipeline.zadd(`user:chat:${chat.userId}`, {
  //     score: Date.now(),
  //     member: `chat:${chat.id}`
  //   })
  //   await pipeline.exec()
  //   return;
  // }

  return;
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
