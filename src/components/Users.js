import React, { useEffect, useState } from 'react';
import {
  Heading,
  SimpleGrid,
  Box,
  Avatar,
  Text,
  Button,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://api.github.com/users');
      const dataJson = await data.json();
      setUsers(dataJson);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          paddingBottom="20px"
        >
          <Heading as="h1" fontSize="45px" paddingBottom="10px" color="#102A42">
            Loading...
          </Heading>
          <Divider orientation="horizontal" w="40%" />
        </Box>
        <Flex justifyContent="center" alignItems="center" paddingTop="20px">
          <Spinner size="xl" color="blue.500" thickness="10px" />
        </Flex>
      </>
    );
  }

  const Pages = [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = users?.slice(indexOfFirstPost, indexOfLastPost);

  for (let i = 1; i <= Math.ceil(users?.length / postsPerPage); i++) {
    Pages.push(i);
  }

  const changePage = prop => {
    setCurrentPage(prop);
  };
  const arrowChange = props => {
    if (props == 'left' && currentPage == 1) {
      setCurrentPage(postsPerPage - 1);
    } else if (props == 'left') {
      setCurrentPage(prevState => prevState - 1);
    }
    if (props == 'right' && currentPage == Pages.length) {
      setCurrentPage(1);
    } else if (props == 'right') {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        paddingBottom="20px"
      >
        <Heading as="h1" fontSize="45px" paddingBottom="10px" color="#102A42">
          Git users
        </Heading>
        <Divider orientation="horizontal" w="40%" />
      </Box>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="30px" padding="20px">
        {currentPost?.map(user => {
          return (
            <Box
              boxShadow="base"
              bg="#F1F5F8"
              key={user?.id}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
              padding="15px"
              maxW="268px"
            >
              <Avatar size="xl" src={user?.avatar_url}></Avatar>
              <Text
                textTransform="capitalize"
                fontWeight="600"
                color="blue.500"
                padding="10px 0 10px 0"
              >
                {user?.login}
              </Text>
              <Link to={`user/${user?.login}`}>
                <Button bg="blue.300" size="sm">
                  VIEW PROFILE
                </Button>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
      <Flex
        justifyContent="center"
        alignItems="center"
        gap="10px"
        paddingTop="10px"
      >
        <ArrowBackIcon
          fontSize="25px"
          onClick={() => arrowChange('left')}
          cursor="pointer"
          _hover={{
            color: 'blue',
          }}
        />
        {Pages?.map((page, index) => {
          return (
            <Button key={index} onClick={() => changePage(page)}>
              {page}
            </Button>
          );
        })}
        <ArrowForwardIcon
          fontSize="25px"
          onClick={() => arrowChange('right')}
          cursor="pointer"
          _hover={{
            color: 'blue',
          }}
        />
      </Flex>
    </>
  );
};

export default Users;
