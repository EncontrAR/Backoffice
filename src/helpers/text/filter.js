export default function renderTitle(title) {
	if (title === null) return ''

  if (title.length >= 20) {
    return (
      title.substring(0, 17) + '...'
    )
  } else {
    return (
      title
    )
  }
}