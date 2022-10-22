import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleUser = () => {
  const [user, setUser] = useState();
  const [dataRepos, setDataRepos] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://api.github.com/users/${id}`);
      const dataJson = await data.json();
      setUser(dataJson);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dataRepo = await fetch(`https://api.github.com/users/${id}/repos`);
      const dataRepoJson = await dataRepo.json();
      setDataRepos(dataRepoJson);
      setLoading(false);
    };
    fetchData();
  }, [user]);
  console.log(dataRepos);

  if (loading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          paddingBottom="20px"
          h="20vh"
        >
          <Heading as="h1" fontSize="45px" paddingBottom="10px">
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

  return (
    <>
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        paddingTop="25px"
        paddingBottom="30px"
      >
        <Link to="/">
          <Button position="absolute" top="20px" left="20px" bg="blue.300">
            Go Back
          </Button>
        </Link>
        <Heading as="h1" fontSize="45px" paddingBottom="10px" color="#102A42">
          User
        </Heading>
        <Divider orientation="horizontal" w="40%" />
      </Flex>
      <Flex>
        <Flex
          flexDir="column"
          justifyContent="flex-start"
          alignItems="center"
          padding="0 20px 0 20px"
        >
          <Avatar src={user?.avatar_url} size="xl" boxShadow="base" />
          <Heading as="h4" textAlign="center" fontSize="30px">
            @{user?.name}
          </Heading>
          <Text fontWeight="600">Location: {user?.location}</Text>
          <Text fontWeight="600">Company: {user?.company}</Text>
          <Text fontWeight="600">
            Creation: {user?.created_at.slice(0, 10)}
          </Text>
          <Text fontWeight="600">Followers: {user?.followers}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems=""
          w="80%"
          padding="20px 10px 0 30px"
          borderLeft="1px solid black"
        >
          <Flex flexDir="column" alignItems="center">
            <Heading as="h5">Repostories</Heading>
            {dataRepos?.map(repo => {
              return <Text paddingTop="5px">{repo.name}</Text>;
            })}
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Heading as="h5">Tecnology</Heading>
            {dataRepos?.map(repo => {
              return <Text>{repo.language}</Text>;
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SingleUser;
