import { Select } from '@/components'
import DefaultLayout from '@/layouts/default'
import { useState } from 'react'
import { IUser, users } from '../data'
import { title } from '@/components/primitives'
import { Avatar } from '@nextui-org/avatar'
import { cn } from '@nextui-org/theme'

export default function IndexPage() {
	const [options, setOptions] = useState<IUser[]>(users)
	const [value1, setValue1] = useState<IUser | undefined>()
	const [value3, setValue3] = useState<IUser | undefined>()
	const [value2, setValue2] = useState<IUser[]>([])
	const [value4, setValue4] = useState<IUser[]>([])

	const handleAddOption = (newOption: IUser) => {
		setOptions(prevOptions => [...prevOptions, newOption])
	}

	return (
		<DefaultLayout>
			<div className='grid w-full gap-10 mb-[300px] lg:grid-cols-2'>
				<section className='space-y-6'>
					<p className={title({ color: 'blue', size: 'lg' })}>Single Select</p>
					<p>Default label and dropdown</p>
					<div className='w-full'>
						<Select
							options={options}
							value={value1}
							onChangeSelect={o => setValue1(o)}
							onAddOption={handleAddOption}
							renderOption={option => <div>{option.name}</div>}
						/>
					</div>
				</section>

				<section className='space-y-6'>
					<p className={title({ color: 'blue', size: 'lg' })}>Multi Select</p>
					<p>Custom label and dropdown</p>

					<div className=''>
						<Select
							options={options}
							multiple={true}
							value={value2}
							onChangeSelect={o => setValue2(o)}
							onAddOption={handleAddOption}
							renderOption={option => (
								<div className='flex items-center gap-[12px] py-2 w-full'>
									<Avatar src={option.avatar} size='sm' />
									<div className='flex flex-col'>
										<p className='text-[15px] font-semibold'>{option.name}</p>
										<p
											className='text-[13px] text-black/40 dark:text-white/40 line-clamp-1'
											style={{ wordBreak: 'break-all' }}
										>
											{option.email}
										</p>
									</div>
								</div>
							)}
							renderValue={value => (
								<div className='flex items-center gap-[12px] w-full'>
									<Avatar src={value.avatar} className='w-[16px] h-[16px]' />
									<div className='flex flex-col'>
										<p className='text-[15px] font-semibold'>{value.name}</p>
									</div>
								</div>
							)}
						/>
					</div>
				</section>

				<section className='space-y-6'>
					<p className={title({ color: 'blue', size: 'lg' })}>Single Select</p>
					<p>Default label and custom dropdown</p>
					<div className=''>
						<Select
							options={options}
							value={value3}
							onChangeSelect={o => setValue3(o)}
							onAddOption={handleAddOption}
							renderOption={option => (
								<div className='flex items-center gap-[12px] py-2 w-full'>
									<Avatar src={option.avatar} size='sm' />
									<div className='flex flex-col'>
										<p className='text-[15px] font-semibold'>{option.name}</p>
										<p
											className='text-[13px] text-black/40 dark:text-white/40 line-clamp-1'
											style={{ wordBreak: 'break-all' }}
										>
											{option.email}
										</p>
									</div>
								</div>
							)}
							renderValue={value => (
								<div className='flex items-center gap-[12px] w-full'>
									<Avatar src={value.avatar} className='w-[16px] h-[16px]' />
									<div className='flex flex-col'>
										<p className='text-[15px] font-semibold'>{value.name}</p>
									</div>
								</div>
							)}
						/>
					</div>
				</section>

				<section className='space-y-6'>
					<p className={title({ color: 'blue', size: 'lg' })}>Multi Select</p>
					<p>Defaul label and dropdown</p>

					<div className=''>
						<Select
							options={options}
							multiple={true}
							value={value4}
							onChangeSelect={o => setValue4(o)}
							onAddOption={handleAddOption}
							// renderOption={option => (
							// 	<div className='flex items-center gap-[12px] py-2 w-full'>
							// 		<Avatar src={option.avatar} size='sm' />
							// 		<div className='flex flex-col'>
							// 			<p className='text-[15px] font-semibold'>{option.name}</p>
							// 			<p
							// 				className='text-[13px] text-black/40 line-clamp-1'
							// 				style={{ wordBreak: 'break-all' }}
							// 			>
							// 				{option.email}
							// 			</p>
							// 		</div>
							// 	</div>
							// )}
							// renderValue={value => (
							// 	<div className='flex items-center gap-[12px] w-full'>
							// 		<Avatar src={value.avatar} className='w-[16px] h-[16px]' />
							// 		<div className='flex flex-col'>
							// 			<p className='text-[15px] font-semibold'>{value.name}</p>
							// 		</div>
							// 	</div>
							// )}
						/>
					</div>
				</section>
			</div>
		</DefaultLayout>
	)
}
