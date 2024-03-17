import {
    AddIcon,
    CheckIcon,
    CloseIcon,
    InfoOutlineIcon,
  } from "@chakra-ui/icons";
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Center,
    Flex,
    FormLabel,
    HStack,
    Icon,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Progress,
    SimpleGrid,
    Spacer,
    Text,
    VStack,
    useDisclosure,
  } from "@chakra-ui/react";
  import { ErrorMessage, Field, FieldArray, Formik } from "formik";
  import { useState, useRef } from "react";
  import { HSeparator } from "components/separator/Separator";
  // suraynsh tripathi box vegan it services pune
  import * as Yup from "yup";
  import timerImage from "../../../../../assets/img/nfts/spinner2.gif";
  import {
    adminreset,
    getAdmins,
  } from "../../../../../features/admin/adminSlice";
  import { PiTimerFill } from "react-icons/pi";
  import { SettingsIcon } from "@chakra-ui/icons";
  
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory } from "react-router-dom";
  
  import axios from "axios";
  import { useEffect } from "react";
  import { IoTimer } from "react-icons/io5";
  import { RiTimerLine } from "react-icons/ri";
  import { FaRegClock } from "react-icons/fa";
  import { AiOutlineClockCircle } from "react-icons/ai";
  import { MdOutlineAccessAlarm } from "react-icons/md";
  import Swal from "sweetalert2";
  import Card from "components/card/Card";
  
  const validationSchema = Yup.object().shape({
    ngap_dev: Yup.string().required("NGAP is required"),
    ngap_port: Yup.number()
      .typeError("Port  must be a number")
      .integer("Port Number must be an integer")
      .min(0, "Port Number must be greater than or equal to 0")
      .max(65535, "Port  must be less than or equal to 65535")
      .required("Port Number is required"),
  
    amf_imsVoPS: Yup.number()
      .typeError("ImsVops must be a number")
      .integer("ImsVops  must be an integer")
      .required("ImsVops is required"),
  
    network_name: Yup.string().required("Network Name is required"),
    mnc: Yup.string().required("MNC is required"),
    mcc: Yup.string().required("MCC is required"),
  
    slice: Yup.array()
      .of(
        Yup.object().shape({
          sst: Yup.string().required("sst is required"),
         
        })
      )
      
      .test(
        "custom-validation",
        "Values between indexes must be greater than 10",
        function (value) {
          /////////////////////////slice sst sd validation ///////////////////////
          const slicesst = value.map((slice) => {
            return slice.sst;
          });
          const slicesd = value.map((slice) => {
            return slice.sd;
          });
          var count = 0;
          function areEqual(slicesst, slicesd) {
            for (var i = 0; i < slicesst.length; ++i) {
              for (var j = i + 1; j < slicesst.length; ++j)
                if (parseInt(slicesst[i]) === parseInt(slicesst[j])) {
                  if (
                    parseInt(slicesd[i]) === parseInt(slicesd[j]) ||
                    (slicesd[i] == undefined && slicesd[j] == undefined)
                  ) {
                    count++;
                  }
                }
            }
          }
          areEqual(slicesst, slicesd);
  
          if (value) {
            // const valuesToCheck = value.slice(0, 5 + 1);
            return count === 0;
          }
  
          return true;
        }
      ),
  });
  
  const ConFormAll = (props) => {
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
    const [amfCount, setAmfCount] = useState({});
    const [amfData, setAmfData] = useState(null);
    const [refTokenTimer, setRefTokenTimer] = useState(true);
    const [autoCloseTime] = useState(120000); // Auto-close time in milliseconds (e.g., 5000ms = 5 seconds)
  
    const [countdown, setCountdown] = useState(120);
  
    useEffect(() => {
      let countdownInterval;
  
      if (isOpen2) {
        countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
  
        // Clear the interval after 2 seconds
        setTimeout(() => {
          setCountdown(120);
          Swal.fire({
            icon: "success",
            text: "Amf configrations has been updated successfully",
            showCloseButton: true,
            showConfirmButton: false,
            timer: 4000,
          });
          clearInterval(countdownInterval);
          onClose();
        }, 120000);
      }
  
      return () => {
        // Cleanup the interval if the modal is closed before 2 seconds
        clearInterval(countdownInterval);
      };
    }, [isOpen2, onClose2]);
    const dispatch = useDispatch();
    const history = useHistory();
  
    const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      let timeoutId;
  
      if (isOpen2) {
        timeoutId = setTimeout(() => {
          onClose2();
        }, autoCloseTime);
      }
  
      return () => {
        // Clear the timeout if the component unmounts or the modal is closed manually
        clearTimeout(timeoutId);
      };
    }, [isOpen2, onClose2, autoCloseTime]);
    const [updatedValues, setUpdatedValues] = useState({});
   
    const fetchAMF = () => {
      const user_token = () => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        if (user != null) return user.accessToken;
        else return "token";
      };
      const token = user_token();
      const config = {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_IP}/5gcore/listofnf/nfName=${
            props.amf
          }
          `,config
        )
        .then((amfres) => {
          setAmfData(amfres.data.amf[0]);
  
          setAmfCount({
            network_name: amfres.data.amf[0].amf.network_name.full,
            mcc: amfres.data.amf[0].amf.guami[0].plmn_id.mcc,
            amf_imsVoPS: amfres.data.amf[0].amf.nf_support.imsVoPS,
            slice: amfres.data.amf[0].amf.plmn_support[0].s_nssai,
            sd: null,
            mnc: amfres.data.amf[0].amf.guami[0].plmn_id.mnc,
            tac: amfres.data.amf[0].amf.tai[0].tac,
            ngap_dev: amfres.data.amf[0].amf.ngap.dev,
            ngap_port: amfres.data.amf[0].amf.ngap.port,
          });
        });
    };
    const cancelRef = useRef();
    const openCOnfirmationBox = (values, actions) => {
      onOpen1();
      setUpdatedValues(values);
      actions.setSubmitting(false);
    };
    const saveAmf = () => {
      const user_token = () => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        if (user != null) return user.accessToken;
        else return "token";
      };
      const token = user_token();
      const config = {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      onClose1();
      amfData.amf.ngap.dev = updatedValues.ngap_dev;
      amfData.amf.network_name.full = updatedValues.network_name;
      amfData.amf.ngap.dev = updatedValues.ngap_dev;
      amfData.amf.ngap.port = updatedValues.ngap_port;
      amfData.amf.nf_support.imsVoPS = updatedValues.amf_imsVoPS;
      amfData.amf.guami[0].plmn_id.mcc = updatedValues.mcc;
      amfData.amf.tai[0].plmn_id.mcc = updatedValues.mcc;
      amfData.amf.plmn_support[0].plmn_id.mcc = updatedValues.mcc;
      amfData.amf.guami[0].plmn_id.mnc = updatedValues.mnc;
      amfData.amf.tai[0].plmn_id.mnc = updatedValues.mnc;
      amfData.amf.plmn_support[0].plmn_id.mnc = updatedValues.mnc;
      amfData.amf.tai[0].tac = updatedValues.tac;
      amfData.amf.plmn_support[0].s_nssai = updatedValues.slice;
  
      const allNfData = {
        amf: amfData,
      };
      onOpen2();
      const promise1 = axios.post(
        `${process.env.REACT_APP_BACKEND_IP}/5gcore/listofnf/AmfnfName=${props.amf}`,
        amfData,config
      );
  
      Promise.all([promise1])
        .then((values) => {})
        .catch((error) => {});
    };
    function convertSecondsToMinutesAndSeconds(seconds) {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
  
      // Adding leading zeros for single-digit seconds
      remainingSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
  
      return `${minutes} min: ${remainingSeconds}  sec`;
    }
    useEffect(() => {
      fetchAMF();
    }, [props.siteId]);
    useEffect(() => {
      if (!user) {
        history.push("/auth");
      }
      const interval = setInterval(() => {
        setRefTokenTimer((refTokenTimer) => !refTokenTimer);
      }, 24000);
    }, []);
  
    // use effect dispatch get Admins
    useEffect(() => {
      dispatch(getAdmins());
      return () => {
        dispatch(adminreset());
      };
    }, [refTokenTimer]);
  
    return (
     
      <Card  bg="white" mt={4}>
        {props.amf !== null && (
          <Formik
            initialValues={amfCount}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={openCOnfirmationBox}
          >
            {({ errors, touched, values, isValid, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Flex>
                  <Center>
                    <Text
                      pt={8}
                      ml={7}
                      color="gray.600"
                      minW={120}
                      fontSize="22px"
                      fontWeight={600}
                    >
                      {" "}
                      AMF {props.index === -1 ? "" : props.index + 1} Configration
                    </Text>
                  </Center>
                </Flex>
                <HSeparator
                  height={{
                    sm: "2px",
                    md: "1px",
                    lg: "1px",
                    base: "1px",
                    xl: "1px",
                  }}
                  mt={5}
                />
                <Box boxShadow={"base"} m={5}>
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
                      NGAP Configrations{" "}
                      <SettingsIcon
                        boxSize={{ sm: 3, md: 4, lg: 4, base: 4, xl: 4 }}
                        mt={-1}
                      />
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
                              DEV
                            </Text>
                          </FormLabel>
                        </Box>
                        <Field
                          type="text"
                          id="ngap_dev"
                          name="ngap_dev"
                          placeholder="Enter Ngap_dev..."
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
                          name="ngap_dev"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Box>
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
                              PORT
                            </Text>
                          </FormLabel>
                        </Box>
                        <Field
                          type="text"
                          id="ngap_port"
                          name="ngap_port"
                          placeholder="Enter Ngap_port..."
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
                          name="ngap_port"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Box>
  
                {/* PFCP Configration */}
                <Box boxShadow={"base"} m={5}>
                  <Flex gap={9}>
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
                      Amf Network Configrations{" "}
                      <SettingsIcon
                        boxSize={{ sm: 3, md: 4, lg: 4, base: 4, xl: 4 }}
                        mt={-1}
                      />
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
                      <Box mr={5}>
                        <FormLabel display="flex">
                          <Text
                            mt={5}
                            minW="130px"
                            color="gray.600"
                            fontSize="14px"
                            fontWeight="600"
                            lineHeight="100%"
                          >
                            Network Name
                          </Text>
                        </FormLabel>
                        <Field
                          type="text"
                          id="network_name"
                          name="network_name"
                          placeholder="Enter Network Name..."
                          style={{
                            width: "100%",
                            padding: "10px",
  
                            borderWidth: "2px",
                            borderRadius: "5px",
                            borderColor: "gray.400",
                          }}
                          bg="gray.200"
                        ></Field>
  
                        <ErrorMessage
                          name="network_name"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Box>
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
                              imsVoPS
                            </Text>
                          </FormLabel>
                        </Box>
                        <Field
                          type="text"
                          id="amf_imsVoPS"
                          name="amf_imsVoPS"
                          placeholder="Enter amf_imsVoPS..."
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
                          name="amf_imsVoPS"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Box>
  
                <Box>
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
                            MNC
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="mnc"
                        name="mnc"
                        placeholder="Enter MNC..."
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
                        name="mnc"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Box>
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
                            MCC
                          </Text>
                        </FormLabel>
                      </Box>
                      <Field
                        type="text"
                        id="mcc"
                        name="mcc"
                        placeholder="Enter MCC..."
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
                        name="mcc"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </Box>
                  </SimpleGrid>
                </Box>
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
                    Slice Configrations{" "}
                    <SettingsIcon
                      boxSize={{ sm: 3, md: 4, lg: 4, base: 4, xl: 4 }}
                      mt={-1}
                    />
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
                                    SLICE {index + 1}
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
                                      Slice {index + 1}
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
                                          SST
                                        </Text>
                                      </FormLabel>
                                    </Box>
                                    <Field
                                      type="text"
                                      name={`slice.${index}.sst`}
                                      placeholder="Enter SST..."
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
                                      name={`slice.${index}.sst`}
                                      component="div"
                                      style={{ color: "red" }}
                                    />
  
                                    {/* <ErrorMessage name="slice" component="div"  style={{ color: 'red' }} /> */}
                                  </Box>
  
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
                                          SD
                                        </Text>
                                      </FormLabel>
                                    </Box>
                                    <Field
                                      type="text"
                                      name={`slice.${index}.sd`}
                                      placeholder="Enter SD..."
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
                                      name={`slice.${index}.sd`}
                                      component="div"
                                      style={{ color: "red" }}
                                    />
                                  </Box>
                                </SimpleGrid>
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
                                          DYNAMIC
                                        </Text>
                                      </FormLabel>
                                    </Box>
                                    <Field
                                      type="text"
                                      disabled={true}
                                      name={`slice.${index}.dynamic`}
                                      placeholder="Enter Dynamic"
                                      style={{
                                        width: "100%",
                                        padding: "10px",
                                        margin: "5px 0",
                                        borderWidth: "2px",
                                        borderRadius: "5px",
                                        backgroundColor: "#e7eaf6",
                                        color: "Gray",
                                        borderColor: "gray.400",
                                      }}
                                      bg="gray.200"
                                    ></Field>
                                    <ErrorMessage
                                      name={`slice.${index}.dynamic`}
                                      component="div"
                                      style={{ color: "red" }}
                                    />
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
                        ) : (
                          <div>At Least One slice is required</div>
                        )}
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
                            arrayHelpers.push({ dynamic: 0, sd: "0xffffff" })
                          }
                        >
                          <AddIcon boxSize={2} />
                          <Text
                            p={2}
                            fontSize="14px"
                            fontWeight="300"
                            lineHeight="100%"
                          >
                            Slice
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
                {/* Tac Information */}
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
                          TAC
                        </Text>
                      </FormLabel>
                    </Box>
                    <Field
                      type="text"
                      id="tac"
                      name="tac"
                      placeholder="Enter TAC..."
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
                      name="tac"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </Box>
                </SimpleGrid>
  
                <Button
                  mt={5}
                  ml={25}
                  disabled={!isValid}
                  fontSize="md"
                  fontWeight={600}
                  bg="brand.800"
                  colorScheme="brand"
                  minW="180px"
                  h="35px"
                  mb="24px"
                  borderRadius={8}
                  type="submit"
                >
                  Save AMF {" "}
                  Configration {props.index === -1 ? "" : props.index + 1}
                </Button>
              </form>
            )}
          </Formik>
        )}
        {/* <Button onClick={onOpen}>jjjjjjjj</Button> */}
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
              <Center>
              <Text
                color="red.500"
                fontSize="16px"
                fontWeight="500"
                lineHeight="100%"
              >
                You won't be able to revert this AMF Configration ! !
              </Text>
              </Center>
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
                        saveAmf();
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
          closeOnOverlayClick={false}
          motionPreset="slideInBottom"
          isOpen={isOpen2}
          onClose={onClose2}
          isCentered
        >
          {" "}
          {/* Center the modal using translate */}
          <ModalOverlay />
          <ModalContent>
            <AlertDialogBody pb={6}>
              <VStack m={2} gap={5}>
                <InfoOutlineIcon w={12} h={12} color="red.500" />
                <Text fontSize={16} fontWeight={600} color="green.600" mt={2}>
                  {" "}
                  {convertSecondsToMinutesAndSeconds(countdown)}
                </Text>
              </VStack>
              <Flex>
                <Flex gap={2}></Flex>
              </Flex>
  
              <Progress
                hasStripe
                mt={5}
                height={4}
                borderRadius={2}
                width="100%"
                value={((120 - countdown) / 120) * 100}
                color="brand.300"
                size="md"
                bg="brand.100"
                isAnimated
              />
              <Center>
                <Text mt={10} fontSize={14} fontWeight={600}>
                  Amf Configration is saving...
                </Text>
              </Center>
            </AlertDialogBody>
          </ModalContent>
        </AlertDialog>
      </Card>
     
    );
  };
  
  export default ConFormAll;
  