export const variants = {
	open: {
		opacity: 1,
		scale: 1,
		transition: {
			type: 'spring',

			staggerChildren: 0.1
		}
	},
	closed: {
		opacity: 0,
		scale: 0.95,
		transition: {
			type: 'spring'
		}
	}
}
export const itemVariants = {
	open: { opacity: 1, x: 0 },
	closed: { opacity: 0, x: -20 }
}
export const itemVariantsScale = {
	open: { opacity: 1, scale: 1 },
	closed: { opacity: 0, scale: 0.5 }
}
