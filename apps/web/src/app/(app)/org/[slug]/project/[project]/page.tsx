'use client'

import { useQuery } from '@tanstack/react-query'
import { XCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getProject } from '@/http/get-project'

export default function Project() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data } = useQuery({
    queryKey: ['project', projectSlug],
    queryFn: () => getProject({ org: orgSlug, project: projectSlug }),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            {data?.project.avatarUrl && (
              <AvatarImage src={data?.project.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>
          <h1 className="text-2xl font-bold">{data?.project.name}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Update project</Button>
          <Button variant="destructive">
            <XCircle className="mr-2 size-4" />
            Delete project
          </Button>
        </div>
      </div>

      <div>{data?.project.description}</div>
    </div>
  )
}
