export function formatUserName(name: string): string {
	const [firstName, lastName] = name.split(' ')
	if (!lastName) {
		return firstName
	}
	const initial = lastName.charAt(0)
	return `${firstName} ${initial}.`
}
