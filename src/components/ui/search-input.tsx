import { Box, Input, IconButton } from "@chakra-ui/react"
import { SearchNormal1 } from "iconsax-react"
import { FaTimes, FaTimesCircle } from "react-icons/fa"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxW?: string | number
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  maxW = "400px",
}: SearchInputProps) => {
  return (
    <Box position="relative" maxW={maxW}>
      {/* Left search icon */}
      <Box
        position="absolute"
        left={3}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
      >
        <SearchNormal1 size="20" color="#A0AEC0" />
      </Box>

      {/* Input */}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="white"
        border="1px"
        borderColor="gray.200"
        pl={10}
        pr={value ? 10 : 3} // give space for X button
      />

      {/* Right clear (X) button */}
      {value && (
        <IconButton
          aria-label="Clear search"
          size="xs"
          variant="ghost"
          position="absolute"
          right={2}
          top="50%"
          transform="translateY(-50%)"
          onClick={() => onChange("")}
        ><FaTimesCircle /></IconButton>
      )}
    </Box>
  )
}

export default SearchInput
