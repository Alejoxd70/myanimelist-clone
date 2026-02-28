interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AnimeDescription({ params }: PageProps) {
  const { id } = await params
  return (
    <div>hi {id}</div>
  )
}