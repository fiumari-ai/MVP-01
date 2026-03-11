import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ModuleMeta {
  slug: string
  title: string
  description: string
  order: number
  tier: 'free' | 'pro'
  estimatedTime: string
  lessons: string[]
  color: string
}

export interface LessonMeta {
  slug: string
  title: string
  description: string
  module: string
  order: number
  duration: string
  tier: 'free' | 'pro'
}

export interface LessonContent extends LessonMeta {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'lessons')

export function getModules(): ModuleMeta[] {
  try {
    const moduleDirs = fs
      .readdirSync(CONTENT_DIR)
      .filter((dir) => fs.statSync(path.join(CONTENT_DIR, dir)).isDirectory())

    const modules = moduleDirs
      .map((dir) => {
        const modulePath = path.join(CONTENT_DIR, dir, 'module.json')
        if (!fs.existsSync(modulePath)) return null
        const raw = fs.readFileSync(modulePath, 'utf-8')
        return JSON.parse(raw) as ModuleMeta
      })
      .filter(Boolean) as ModuleMeta[]

    return modules.sort((a, b) => a.order - b.order)
  } catch {
    return []
  }
}

export function getModule(slug: string): ModuleMeta | null {
  try {
    const modulePath = path.join(CONTENT_DIR, slug, 'module.json')
    if (!fs.existsSync(modulePath)) return null
    const raw = fs.readFileSync(modulePath, 'utf-8')
    return JSON.parse(raw) as ModuleMeta
  } catch {
    return null
  }
}

export function getLessons(moduleSlug: string): LessonMeta[] {
  try {
    const moduleDir = path.join(CONTENT_DIR, moduleSlug)
    const module = getModule(moduleSlug)
    if (!module) return []

    const lessons = module.lessons
      .map((lessonSlug) => {
        const lessonPath = path.join(moduleDir, `${lessonSlug}.mdx`)
        if (!fs.existsSync(lessonPath)) return null
        const raw = fs.readFileSync(lessonPath, 'utf-8')
        const { data } = matter(raw)
        return {
          slug: lessonSlug,
          title: data.title || lessonSlug,
          description: data.description || '',
          module: moduleSlug,
          order: data.order || 0,
          duration: data.duration || '10 min',
          tier: data.tier || 'free',
        } as LessonMeta
      })
      .filter(Boolean) as LessonMeta[]

    return lessons.sort((a, b) => a.order - b.order)
  } catch {
    return []
  }
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string
): LessonContent | null {
  try {
    const lessonPath = path.join(CONTENT_DIR, moduleSlug, `${lessonSlug}.mdx`)
    if (!fs.existsSync(lessonPath)) return null
    const raw = fs.readFileSync(lessonPath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug: lessonSlug,
      title: data.title || lessonSlug,
      description: data.description || '',
      module: moduleSlug,
      order: data.order || 0,
      duration: data.duration || '10 min',
      tier: data.tier || 'free',
      content,
    }
  } catch {
    return null
  }
}

export function getTotalLessons(): number {
  const modules = getModules()
  return modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
}
