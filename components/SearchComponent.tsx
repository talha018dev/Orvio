'use client'

import Icon from '@/components/UI/Icon'
import { COLOR_PRIMARY_TEXT, COLOR_SECONDARY_TEXT } from '@/constants/colorConstants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type SearchComponentProps = {
    placeholder: string
}

const SearchComponent = ({ placeholder }: SearchComponentProps) => {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState<string>('')
    const typingTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (searchParams?.get('search')) {
            setSearch(searchParams.get('search') as string)
        } else {
            setSearch('')
        }
    }, [searchParams])

    const clearSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        setSearch('')
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleSearchChange = () => {
        if (typingTimer.current) clearTimeout(typingTimer.current);

        typingTimer.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            params.set("search", search);
            router.push(`${pathname}?${params.toString()}`);
        }, 800);
    };

    return (
        <section className='flex items-center w-full border-b-[1px] border-borderColor hover:border-primary focus:border-primary transition-all duration-300'>
            <div className='relative w-full'>
                <div className='absolute left-2 top-3.5'>
                    <Icon name={'MagnifyingGlass'} color={COLOR_PRIMARY_TEXT} weight='regular' fontSize={14} />
                </div>
                <input
                    className='flex h-11 w-full outline-0 py-3 bg-outlineHover pl-7 pr-6 text-sm placeholder:text-placeholderText disabled:cursor-not-allowed disabled:opacity-50'
                    placeholder={placeholder}
                    value={search ?? ''}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={handleSearchChange}
                    // readOnly={true}
                />
                {search && (
                    <div className='absolute right-2 top-3.5 cursor-pointer' onClick={clearSearch}>
                        <Icon name='X' color={COLOR_SECONDARY_TEXT} fontSize={14} />
                    </div>
                )}
            </div>
        </section>
    )
}

export default SearchComponent;
