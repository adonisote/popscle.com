export default function Page({ params }: { params: { slug: string } }) {

  return (
    <p>Space: {params.slug}</p>
  )
}