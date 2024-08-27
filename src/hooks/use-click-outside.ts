import { useEffect, useRef } from 'react'

export function useClickOutside<T extends HTMLElement>(callback: () => void): React.RefObject<T> {
	const containerRef = useRef<T>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [callback])

	return containerRef
}
