import { IUser } from '@/data'
import { cn } from '@nextui-org/theme'
import { Check, ChevronDown, PlusIcon, SearchIcon, XIcon } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion } from 'framer-motion'
import { itemVariants, itemVariantsScale, variants } from '@/lib/animations'
import { useClickOutside } from '@/hooks/use-click-outside'

type SingleSelectProps = {
	multiple?: false
	value?: IUser
	onChangeSelect: (value: IUser | undefined) => void
}
type MultipleSelectProps = {
	multiple: true
	value?: IUser[]
	onChangeSelect: (value: IUser[]) => void
}
type SelectProps = {
	options: IUser[]
	multiple?: boolean
	error?: boolean
	onAddOption?: (option: IUser) => void
	renderOption?: (option: IUser) => ReactNode
	renderValue?: (value: IUser) => ReactNode
} & (SingleSelectProps | MultipleSelectProps)

export const Select = ({
	multiple,
	value,
	error,
	options,
	onChangeSelect,
	onAddOption,
	renderOption,
	renderValue
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [highlightIndex, setHighlightIndex] = useState(0)
	const triggerRef = useRef<HTMLDivElement>(null)
	const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))
	const containerValueRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const optionRefs = useRef<(HTMLLIElement | null)[]>([])
	const ulRef = useRef<HTMLUListElement>(null)

	//
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setInputValue(newValue)
		setIsOpen(newValue !== '')
	}

	const isOptionSelected = (option: IUser) => {
		return multiple ? value?.includes(option) : option === value
	}

	const selectOption = (option: IUser) => {
		if (multiple) {
			const newValue = (value as IUser[]).includes(option)
				? (value as IUser[]).filter(v => v !== option)
				: [...(value as IUser[]), option]
			onChangeSelect(newValue)
			inputRef.current?.focus()
		} else {
			if (option !== value) {
				onChangeSelect(option)
				setInputValue(option.name)
				setIsOpen(false)
			}
		}
	}

	const filteredOptions = options.filter(option =>
		option.name.toLowerCase().includes(inputValue.toLowerCase())
	)

	const handleTriggerClick = () => {
		setIsOpen(prev => !prev)
		if (multiple) {
			inputRef.current?.focus()
		}
	}

	const handleOptionClick = (option: IUser) => {
		selectOption(option)
	}

	const handleOptionMouseEnter = (index: number) => {
		setHighlightIndex(index)
	}

	// скролл до низа контейнера при открытии dropdown
	// useEffect(() => {
	// 	if (isOpen && ulRef.current) {
	// 		window.scrollTo({
	// 			top: ulRef.current.offsetHeight - 100,
	// 			behavior: 'smooth'
	// 		})
	// 	}
	// }, [isOpen])

	useEffect(() => {
		if (multiple) {
			setInputValue('')
		} else if (value) {
			setInputValue((value as IUser).name)
		}
	}, [value, multiple])

	useEffect(() => {
		if (isOpen) setHighlightIndex(0)
	}, [isOpen])

	// подсчёт ширины инпута у multi варианта
	useEffect(() => {
		if (multiple && containerValueRef.current && inputRef.current) {
			const containerWidth = containerValueRef.current.offsetWidth
			const usedWidth = Array.from(containerValueRef.current.children).reduce((acc, child) => {
				if (child !== inputRef.current) {
					return acc + (child as HTMLElement).offsetWidth
				}
				return acc
			}, 0)

			const availableWidth = containerWidth - usedWidth - 12
			const inputLength = inputRef.current.value.length
			const maxWidth = Math.max(availableWidth, inputLength * 10)
			inputRef.current.style.maxWidth = maxWidth === 0 ? '10px' : `${maxWidth}px`
		}
	}, [value, inputValue, multiple])

	return (
		<>
			<article className='space-y-[8px] relative w-full' ref={containerRef}>
				<label className='text-[15px] font-semibold'>Title</label>

				{/* ========= VALUE ======== */}
				<div
					ref={triggerRef}
					tabIndex={0}
					onClick={handleTriggerClick}
					className={cn(
						'px-[16px] min-h-[44px]',
						'flex gap-[10px] items-center',
						'border border-black/10 dark:border-white/30 dark:bg-neutral-900 rounded-lg outline-none',
						'transition duration-300 ease-soft-spring',
						'focus-within:ring-2 focus-within:border-[#6E328C] hover:ring-2 ring-[#6E328C]/40 hover:border-[#6E328C]',
						isOpen && !error ? 'ring-2 border-[#6E328C] ring-[#6E328C]/40' : null,
						error ? 'ring-2 ring-[#E8433D]/40 border-[#E8433D] hover:border-[#E8433D]' : null,
						multiple && value ? 'p-2' : null
					)}
				>
					{multiple ? (
						value && (value as IUser[]).length > 0 ? (
							<div ref={containerValueRef} className='flex flex-wrap w-full gap-1'>
								{(value as IUser[]).map(v => (
									<div
										key={v.id}
										className='flex gap-1 items-center p-1 rounded-lg bg-[#6E328C]/5 text-[#6E328C] font-medium text-xs'
									>
										{renderValue ? renderValue(v) : v.name}

										<XIcon
											size={16}
											strokeWidth={3}
											onClick={e => {
												e.preventDefault()
												selectOption(v)
											}}
											className='transition duration-300 cursor-pointer opacity-30 hover:opacity-100 ease-soft-spring'
										/>
									</div>
								))}

								<input
									ref={inputRef}
									value={inputValue}
									onChange={handleInputChange}
									className={cn('bg-transparent border-none outline-none font-medium text-[15px]')}
								/>
							</div>
						) : (
							<>
								<SearchIcon size={20} className={cn('text-black/30 dark:text-white/30')} />
								<input
									placeholder='Placeholder'
									value={inputValue}
									onChange={handleInputChange}
									className={cn('bg-transparent border-none outline-none font-medium text-[15px]')}
								/>
							</>
						)
					) : (
						<>
							<input
								placeholder='Placeholder'
								value={inputValue}
								onChange={handleInputChange}
								className={cn('bg-transparent border-none outline-none font-medium text-[15px]')}
							/>

							<div className='flex gap-2 ml-auto'>
								{inputValue.length ? (
									<XIcon
										onClick={e => {
											e.stopPropagation()
											setInputValue('')
											setIsOpen(true)
										}}
										size={20}
										className={cn(
											'text-black/30 dark:text-white/30 hover:text-[#6E328C] cursor-pointer',
											'transition duration-300 ease-soft-spring'
										)}
									/>
								) : null}
								<ChevronDown
									size={20}
									className={cn(
										'text-black/30 dark:text-white/30',
										'transition duration-300 ease-soft-spring',
										isOpen ? 'rotate-180' : 'rotate-0'
									)}
								/>
							</div>
						</>
					)}
				</div>

				{/* ========= OPTIONS ======== */}
				{options.length ? (
					<AnimatePresence mode='wait'>
						<motion.ul
							variants={variants}
							initial='closed'
							animate={isOpen ? 'open' : 'closed'}
							ref={ulRef}
							className={cn(
								isOpen ? 'absolute' : 'hidden',
								'top-[calc(100%_+_0.25rem) z-50',
								'p-[4px] space-y-1 max-h-[300px] w-full',
								'border border-black/10 rounded-lg bg-white shadow-large dark:bg-neutral-900',
								'overflow-y-auto'
							)}
						>
							{filteredOptions.length ? (
								filteredOptions.map((option, index) => (
									<motion.li
										tabIndex={0}
										ref={el => (optionRefs.current[index] = el)}
										key={option.id}
										onClick={() => handleOptionClick(option)}
										onMouseEnter={() => handleOptionMouseEnter(index)}
										variants={itemVariants}
										initial='closed'
										animate={isOpen ? 'open' : 'closed'}
										className={cn(
											'px-[12px] min-h-[36px]',
											'flex gap-2 items-center justify-between',
											'text-[15px] font-medium',
											'rounded-lg cursor-pointer',
											highlightIndex === index ? 'bg-black/5 dark:bg-white/5' : null,
											option.status === 'paused'
												? '!opacity-50 pointer-events-none select-none'
												: null
										)}
									>
										{renderOption ? renderOption(option) : option.name}

										<AnimatePresence mode='wait'>
											{multiple && isOptionSelected(option) ? (
												<motion.div
													variants={itemVariantsScale}
													initial='closed'
													animate={'open'}
													exit={'closed'}
													className='p-1 ml-auto text-[#fff] bg-[#6E328C] rounded-full'
												>
													<span className=''>
														<Check size={16} className='' />
													</span>
												</motion.div>
											) : null}
										</AnimatePresence>
									</motion.li>
								))
							) : (
								<li
									onClick={() => {
										const newOption = { id: Number(new Date()), name: inputValue }
										onAddOption && onAddOption(newOption)
										selectOption(newOption)
										setIsOpen(false)
										setInputValue('')
									}}
									className={cn(
										'px-[12px] min-h-[36px]',
										'flex gap-2 items-center',
										'text-[15px] font-medium',
										'hover:bg-black/5',
										'rounded-lg cursor-pointer'
									)}
								>
									<PlusIcon size={20} /> Создать «{inputValue}»
								</li>
							)}
						</motion.ul>
					</AnimatePresence>
				) : null}
			</article>
		</>
	)
}
