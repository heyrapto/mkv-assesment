import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex={1} overflow="hidden">
        <Header />
        <Box p={6} overflow="auto" h="calc(100vh - 80px)">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default MainLayout;