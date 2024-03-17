import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import React, { useRef } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  SimpleGrid,
  Spacer,
  Switch,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Center,
  Progress,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon, CheckIcon, CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons";


import { SettingsIcon } from "@chakra-ui/icons";

import { useHistory } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { HSeparator } from "components/separator/Separator";
import Card from "components/card/Card";

const validationSchema = Yup.object().shape({
  profile_name: Yup.string().required("Profile Name is required"),
  profile_skills: Yup.string().required("Profile Skills is required"),
  profile_introduction: Yup.string().required("Profile Introduction is required"),
  profile_intrest: Yup.string().required("Profile Intrest is required"),
  profile_hobbies: Yup.string().required("Profile Hobby is required"),
  profile: Yup.array()
  .of(
    Yup.object().shape({
      skill: Yup.string().required("skill is required"),
     
    })
  ),
  Connect: Yup.object().shape({
    github: Yup.string().url('Must be a valid URL'),
    linkedin: Yup.string().url('Must be a valid URL'),
    twitter: Yup.string().url('Must be a valid URL'),
    instagram: Yup.string().url('Must be a valid URL')
  })


});

const ConFormAll = (props) => {
  const [ncFormData, setNcFormData] = useState({});
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const [updatedValues, setUpdatedValues] = useState({});
  const [refTokenTimer, setRefTokenTimer] = useState(true);

  const [n3GwSwitch, setN3GwSwitch] = useState(false);
  const [clientId,setClientId]=useState("")
  const ToggleDN = () => {
    setN3GwSwitch(!n3GwSwitch);
    onClose();
  };
  const handleN3GwChanger = () => {
    onOpen();
  };
  const history = useHistory();



  
 
  const saveNateworkConf = (values) => {
   
   
    axios
  
      .post(
        `http://localhost:3001/api`,values
        
      )
      
      .then((res) => {
        
        onClose2()
        Swal.fire({
          icon: "success",
          text: "Profile has been updated successfully",
          showCloseButton: true,
          showConfirmButton: false,
          timer: 20000,
        });
      });
  };

  useEffect(() => {
    // getNetworkConf();
  }, []);
 



  return (
    <Card mt={100}> 
    <Box boxShadow="base"  rounded="md" width="100%" >
      {props.amf !== null && (
        <Formik
          initialValues={ncFormData}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={saveNateworkConf}
        >
          {({ errors, touched, values, isValid, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Flex>
                <Spacer />

                <Box minW="80px">
                  <Flex></Flex>
                </Box>
              </Flex>

              {/* N2 Configration */}
              <Box >
                <Flex>
                  <Text
                    pt="15px"
                    minW="130px"
                    ml={8}
                    color="gray.700"
                    fontSize="16px"
                    fontWeight="600"
                    lineHeight="100%"
                  >
                    {" "}
                   Profile Deatil
                    
                   </Text>
                </Flex>
                {/* </Box> */}
                <Box
                  boxShadow="sm"
                  rounded="md"
                  width="100%"
                  mt={5}
                  bg="gray.100"
                  pt={4}
                  borderBlockEndColor="gray.900"
                  pb={6}
                >
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, base: 2, lg: 2, xl: 2 }}
                    mt={{ sm: 0, md: 5, base: 5, xl: 5, lg: 5 }}
                    ml={{ sm: 2, md: 45, base: 45, lg: 35, xl: 35 }}
                    mr={35}
                    gap={{
                      md: "140px",
                      sm: "0px",
                      base: "140px",
                      lg: "140px",
                      xl: "140px",
                    }}
                  >
                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Profile Name
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="profile_name"
                        name="profile_name"
                        placeholder="Enter profile name..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="profile_name"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Flex>

                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                          Skills
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="textarea"
                        id="profile_skills"
                        name="profile_skills"
                        placeholder="Enter Profile Skills..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="profile_skills"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Flex>
                  </SimpleGrid>
                </Box>
              </Box>
              <Box >
               
                {/* </Box> */}
                <Box
                  boxShadow="sm"
                  rounded="md"
                  width="100%"
                  mt={5}
                  bg="gray.100"
                  pt={4}
                  borderBlockEndColor="gray.900"
                  pb={6}
                >
                  <SimpleGrid
                    columns={{ sm: 1, md: 1, base: 1, lg: 1, xl: 1 }}
                    mt={{ sm: 0, md: 5, base: 5, xl: 5, lg: 5 }}
                    ml={{ sm: 2, md: 45, base: 45, lg: 35, xl: 35 }}
                    mr={35}
                    gap={{
                      md: "140px",
                      sm: "0px",
                      base: "140px",
                      lg: "140px",
                      xl: "140px",
                    }}
                  >
                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Intruduction
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="profile_introduction"
                        name="profile_introduction"
                        placeholder="Enter profile Introduction..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="profile_introduction"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Flex>

                 
                  </SimpleGrid>
                </Box>
              </Box>
              {/* N3 Configration */}

              <Box boxShadow={"base"} m={5}>
                  <Text
                    pt="15px"
                    minW="130px"
                    ml={8}
                    color="gray.700"
                    fontSize="16px"
                    fontWeight="600"
                    lineHeight="100%"
                  >
                    {" "}
                    Profile 
                    
                  </Text>
  
                  <FieldArray
                    name="slice"
                    render={(arrayHelpers) => (
                      <Box boxShadow="xs" pb={8}>
                        {values.slice && values.slice.length > 0 ? (
                          values.slice.map((slice, index) => (
                            <div key={index}>
                              <Box
                                boxShadow="sm"
                                rounded="md"
                                width="100%"
                                mt={5}
                                bg="gray.100"
                                pt={4}
                                borderBlockEndColor="gray.900"
                                pb={6}
                              >
                                <Flex>
                                  <Text
                                    mt="6px"
                                    minW="130px"
                                    ml={9}
                                    color="gray.500"
                                    fontSize="16px"
                                    fontWeight="600"
                                    lineHeight="100%"
                                  >
                                    Profile {index + 1}
                                  </Text>
                                  <Spacer />
                                  <Button
                                    color="white"
                                    bg="#ff471a"
                                    colorScheme="red"
                                    fontSize="14px"
                                    fontWeight="700"
                                    lineHeight="90%"
                                    width="auto"
                                    mr={10}
                                    height="30px"
                                    borderRadius="8px"
                                    onClick={() => {
                                      index !== 0 && arrayHelpers.remove(index);
                                    }}
                                  >
                                    <CloseIcon boxSize={3} />
                                    <Text
                                      p={2}
                                      fontSize="14px"
                                      fontWeight="300"
                                      lineHeight="100%"
                                    >
                                      Profile {index + 1}
                                    </Text>
                                  </Button>
                                </Flex>
                                <SimpleGrid
                                  columns={{
                                    sm: 1,
                                    md: 2,
                                    base: 2,
                                    lg: 2,
                                    xl: 2,
                                  }}
                                  mt={{ sm: 0, md: 5, base: 5, xl: 5, lg: 5 }}
                                  ml={{ sm: 2, md: 45, base: 45, lg: 35, xl: 35 }}
                                  mr={35}
                                  gap={{
                                    md: "140px",
                                    sm: "0px",
                                    base: "140px",
                                    lg: "140px",
                                    xl: "140px",
                                  }}
                                >
                                  <Box minW="40px">
                                    <Box>
                                      <FormLabel display="flex">
                                        <Text
                                          mt={5}
                                          minW="130px"
                                          color="gray.600"
                                          fontSize="14px"
                                          fontWeight="600"
                                          lineHeight="100%"
                                        >
                                          Skill
                                        </Text>
                                      </FormLabel>
                                    </Box>
                                    <Field
                                      type="text"
                                      name={`slice.${index}.skill`}
                                      placeholder="Enter Skill..."
                                      style={{
                                        width: "100%",
                                        padding: "10px",
                                        margin: "5px 0",
                                        borderWidth: "2px",
                                        borderRadius: "5px",
                                        borderColor: "gray.400",
                                      }}
                                      bg="gray.200"
                                    ></Field>
                                    <ErrorMessage
                                      name={`slice.${index}.skill`}
                                      component="div"
                                      style={{ color: "red" }}
                                    />
  
                                    {/* <ErrorMessage name="slice" component="div"  style={{ color: 'red' }} /> */}
                                  </Box>
  
                                
                                </SimpleGrid>
                            
                                {/*                
                 <Flex width="100%">
                 <Box> 
                 <Box>
                 <FormLabel  
                 display='flex'
                 >
                 <Text
                  mt={5}
                 minW="130px"
                 color='gray.600'
                 fontSize="14px"
                 fontWeight="600"
                 lineHeight="100%"
                 >
               MNC
                 </Text>
                 </FormLabel>
                 </Box>
                 <Field
                   name={`slice.${index}.sst`}
                   type="text"
                   placeholder="Enter sst"
                   style={{
                     width: '100%',
                     padding: '10px',
                     margin: '5px 0',
                     borderRadius: '5px',
                     borderColor: '#007bff', // Change this to the desired color
                   }}
                  
              >
                
                
                 </Field>
                 <ErrorMessage name={`slice.${index}.sst`} component="div" />
                 </Box>
                 <Box > 
                 <Box>
                 <FormLabel  
                 display='flex'
                 >
                 <Text
                  mt={5}
                 minW="130px"
                 color='gray.600'
                 fontSize="14px"
                 fontWeight="600"
                 lineHeight="100%"
                 >
               MNC
                 </Text>
                 </FormLabel>
                 </Box>
                 <Field
                   name={`slice.${index}.sst`}
                   type="text"
                   placeholder="Enter sst"
                   style={{
                     width: '100%',
                     padding: '10px',
                     margin: '5px 0',
                     borderRadius: '5px',
                     borderColor: '#007bff', // Change this to the desired color
                   }}
                  
              >
                
                
                 </Field>
                 <ErrorMessage name={`slice.${index}.sst`} component="div" />
                 </Box>
                 </Flex> */}
                                {/* <Field
                          name={`slice.${index}.sst`}
                          type="text"
                          placeholder="Enter sst"
                          style={{
                            width: '100%',
                            padding: '10px',
                            margin: '5px 0',
                            borderRadius: '5px',
                            borderColor: '#007bff', // Change this to the desired color
                          }}
                        /> */}
                              </Box>
  
                              {/* <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </button> */}
                            </div>
                          ))
                        ) : <></>}
                        <Button
                          mt={5}
                          color="white"
                          variant="darkBrand"
                          fontSize="14px"
                          fontWeight="700"
                          lineHeight="90%"
                          width="auto"
                          ml={8}
                          height="30px"
                          borderRadius="8px"
                          onClick={() =>
                            arrayHelpers.push({ })
                          }
                        >
                          <AddIcon boxSize={2} />
                          <Text
                            p={2}
                            fontSize="14px"
                            fontWeight="300"
                            lineHeight="100%"
                          >
                            Profile
                          </Text>
                        </Button>
                        {/* <Button  
                mt={5} 
                ml={25}
              
               
                           fontSize='md'
                           fontWeight={600}
                           variant='darkBrand'
                         
                           minW='180px'
                           h='35px'
                           mb='24px'
                           borderRadius={8}
                           
                           type="submit"
                           onClick={() => arrayHelpers.push('')}
                           >
                           Save Amf {props.index===-1?"":props.index+1}
                         </Button> */}
                        {/* <button
                    type="button"
                    onClick={() => arrayHelpers.push('')}
                  >
                    Add Email
                  </button> */}
                      </Box>
                    )}
                  />
                </Box>
                <Box >
               
                {/* </Box> */}
                <Box
                  boxShadow="sm"
                  rounded="md"
                  width="100%"
                  mt={5}
                  bg="gray.100"
                  pt={4}
                  borderBlockEndColor="gray.900"
                  pb={6}
                >
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, base: 2, lg: 2, xl: 2 }}
                    mt={{ sm: 0, md: 5, base: 5, xl: 5, lg: 5 }}
                    ml={{ sm: 2, md: 45, base: 45, lg: 35, xl: 35 }}
                    mr={35}
                    gap={{
                      md: "140px",
                      sm: "0px",
                      base: "140px",
                      lg: "140px",
                      xl: "140px",
                    }}
                  >
                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Profile Intrest
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="profile_intrest"
                        name="profile_intrest"
                        placeholder="Enter profile intrests..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="profile_intrest"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Flex>

                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                          Profile Hobbies
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="textarea"
                        id="profile_hobbies"
                        name="profile_hobbies"
                        placeholder="Enter Profile hobbies..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="profile_hobbies"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Flex>
                  </SimpleGrid>
                  
               
               
                <Box
                  boxShadow="sm"
                  rounded="md"
                  width="100%"
                  mt={5}
                  bg="gray.100"
                  pt={4}
                  borderBlockEndColor="gray.900"
                  pb={6}
                >
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, base: 2, lg: 2, xl: 2 }}
                    mt={{ sm: 0, md: 5, base: 5, xl: 5, lg: 5 }}
                    ml={{ sm: 2, md: 45, base: 45, lg: 35, xl: 35 }}
                    mr={35}
                    gap={{
                      md: "140px",
                      sm: "0px",
                      base: "140px",
                      lg: "140px",
                      xl: "140px",
                    }}
                  >
                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Github Account
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="github"
                        name="Connect.github"
                        placeholder="Enter your GitHub URL..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="Connect.github"
                        component="div"
                        style={{ color: "red" }}
                      />
                    
                    </Flex>

                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Linkdien Account
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="linkdien"
                        name="Connect.linkedin"
                        placeholder="Enter your LinkedIn URL..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="Connect.linkedin"
                        component="div"
                        style={{ color: "red" }}
                      />
                    
                    </Flex>
                  </SimpleGrid>
                </Box>
              
                  
                <Box
                  boxShadow="sm"
                  rounded="md"
                  width="100%"
                  mt={5}
                  bg="gray.100"
                  pt={4}
                  borderBlockEndColor="gray.900"
                  pb={6}
                >
                  <SimpleGrid
                    columns={{ sm: 1, md: 2, base: 2, lg: 2, xl: 2 }}
                    mt={{ sm: 0, md: 5, base: 5, xl: 5, lg: 5 }}
                    ml={{ sm: 2, md: 45, base: 45, lg: 35, xl: 35 }}
                    mr={35}
                    gap={{
                      md: "140px",
                      sm: "0px",
                      base: "140px",
                      lg: "140px",
                      xl: "140px",
                    }}
                  >
                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Twitter Account
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="twitter"
                        name="Connect.twitter"
                        placeholder="Enter your Twitter URL..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="Connect.twitter"
                        component="div"
                        style={{ color: "red" }}
                      />
                    
                    </Flex>

                    <Flex minW="40px">
                      <Box>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Instagram Account
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="instagram"
                        name="Connect.instagram"
                        placeholder="Enter your Instagram URL..."
                        style={{
                          width: "100%",
                          padding: "10px",
                          margin: "5px 0",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          borderColor: "gray.400",
                        }}
                        bg="gray.200"
                      ></Field>
                      <ErrorMessage
                        name="Connect.instagram"
                        component="div"
                        style={{ color: "red" }}
                      />
                    
                    </Flex>
                  </SimpleGrid>
                </Box>
       
                </Box>
              </Box>
              <Flex>
                <Spacer />
                <Box mr={10}>
                  <Button
                    mt={5}
                    ml={25}
                    disabled={!isValid}
                    fontSize="md"
                    fontWeight={600}
                   colorScheme="brand"
                   bg="brand.800"
                    minW="180px"
                    h="35px"
                    mb="24px"
                    borderRadius={8}
                    type="submit"
                  >
                    Save Profile{" "}
                  </Button>
                </Box>
              </Flex>
              {/* popupBox */}
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />

                <AlertDialogContent minW="440px">
                  <AlertDialogHeader><Center>Are you sure ?</Center></AlertDialogHeader>
                  <HSeparator />
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                  <Center>
                    <Text
                      color="gray.600"
                      fontSize="16px"
                      fontWeight="500"
                      lineHeight="100%"
                    >
                      You want to change data network configration ?
                    </Text>
                    </Center>
                  </AlertDialogBody>
                  <AlertDialogFooter bg="gray.100">
                    <Box bg="gray.100" width="full">
                      <Center>
                        <Flex m={2} width="200px">
                          <Button
                            leftIcon={<CheckIcon />}
                            minW="80px"
                            colorScheme="green"
                            onClick={ToggleDN}
                            borderRadius={5}
                          >
                            Yes
                          </Button>
                          <Spacer />
                          <Button
                            leftIcon={<CloseIcon />}
                            minW="80px"
                            ref={cancelRef}
                            colorScheme="red"
                            onClick={onClose}
                            borderRadius={5}
                          >
                            No
                          </Button>
                        </Flex>
                      </Center>
                    </Box>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          )}
        </Formik>
      )}
        <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose1}
        isOpen={isOpen1}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent minW="440px">
          <VStack m={2}>
            <InfoOutlineIcon w={10} h={10} color="red.500" />
            <AlertDialogHeader>Are you sure ?</AlertDialogHeader>
          </VStack>

          <HSeparator />
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text
              color="red.500"
              fontSize="16px"
              fontWeight="500"
              lineHeight="100%"
            >
              You won't be able to revert  Network Configration ! !
            </Text>

            <AlertDialogCloseButton />
          </AlertDialogBody>
          <AlertDialogFooter bg="gray.100">
            <Box bg="gray.100" width="full">
              <Center>
                <Flex m={2} width="200px">
                  <Button
                    leftIcon={<CheckIcon />}
                    minW="80px"
                    colorScheme="green"
                    onClick={() => {
                     saveNateworkConf()
                    }}
                    borderRadius={5}
                  >
                    Yes
                  </Button>
                  <Spacer />
                  <Button
                    leftIcon={<CloseIcon />}
                    minW="80px"
                    ref={cancelRef}
                    colorScheme="red"
                    onClick={onClose1}
                    borderRadius={5}
                  >
                    No
                  </Button>
                </Flex>
              </Center>
            </Box>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose2}
        isOpen={isOpen2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent minW="440px">
        
  
          <HSeparator />
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Box width="full" height={150}>
           
            <Center>
          
              <Text mt={10} fontSize={14} fontWeight={600}>
                Network Configration is saving...
              </Text>
             
            </Center>
            <Progress size='xs' isIndeterminate width="98%"  height={2} mt={30}/>
          </Box>
            <AlertDialogCloseButton />
          </AlertDialogBody>
        
        </AlertDialogContent>
      </AlertDialog>
    </Box>
    </Card>
  );
};

export default ConFormAll;
