import { Search } from 'lucide-react'

export default function SearchInput({
  value,
  placeholder,
  onChange,
}: {
  value: string
  placeholder: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex gap-3 items-center px-4 box-border w-80 h-11 border border-[#646464] rounded-3xl">
      <Search color="white" />
      <input
        className="w-full text-white text-lg placeholder:text-[#9a9a9a]"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
