import React, { useEffect, useState } from "react";
import { Text, Touchable, View, Pressable } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import tw from "twrnc";

import Button from "../../../components/button";
import { register } from "../../../services/auth";
import Input from "../../../components/input";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const initialValues = {
    names: "",
    email: "",
    phone: "",
    nationalId: "",
    address: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    names: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    nationalId: Yup.string().required("National Id is required"),
    address: Yup.string().required("Adress is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    getFieldProps,
  } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setAuthError("");
    const res = await register(values);
    setLoading(false);
    if (!res?.success)
      return setAuthError(res?.message || "Something went wrong");
    navigation.navigate("Login");
  };

  return (
    <View style={tw`h-[100%] bg-white  justify-end items-center`}>
      <View style={tw`h-[85%] w-full bg-white `}>
        <View style={tw`w-full`}>
          <Text
            style={tw`text-center font-bold font-serif text-[#8288ff] text-2xl`}
          >
            NEC
          </Text>
          <Text style={tw`text-center font-bold text-xl font-serif`}>
            Welcome! Sign Up
          </Text>
        </View>

        {authError.length > 0 && (
          <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>
        )}
        <View style={tw`mt-8`}>
          <View style={tw`px-6 py-2`}>
            <Input
              Icon={
                <MaterialIcons name="person-outline" size={24} color="silver" />
              }
              placeholder="Full Name"
              onChangeText={handleChange("names")}
              onBlur={handleBlur("names")}
              value={values.names}
              borderColor={touched.names && errors.names ? "red" : "gray"}
            />
            {touched.names && errors.names && (
              <Text style={tw`text-red-500`}>{errors.names}</Text>
            )}

            <View style={tw`mt-4`}></View>
            <Input
              Icon={<Feather name="mail" size={24} color="silver" />}
              placeholder="Your Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              borderColor={touched.email && errors.email ? "red" : "gray"}
            />
            {touched.email && errors.email && (
              <Text style={tw`text-red-500`}>{errors.email}</Text>
            )}

            <View style={tw`mt-4`}></View>
            <Input
              Icon={<Feather name="phone" size={24} color="silver" />}
              placeholder="Phone Number"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              borderColor={touched.phone && errors.phone ? "red" : "gray"}
            />
            {touched.phone && errors.phone && (
              <Text style={tw`text-red-500`}>{errors.phone}</Text>
            )}

            <View style={tw`mt-4`}></View>
            <Input
              Icon={<Feather name="folder" size={24} color="silver" />}
              placeholder="National Id Number"
              onChangeText={handleChange("nationalId")}
              onBlur={handleBlur("nationalId")}
              value={values.nationalId}
              borderColor={
                touched.nationalId && errors.nationalId ? "red" : "gray"
              }
            />
            {touched.nationalId && errors.nationalId && (
              <Text style={tw`text-red-500`}>{errors.nationalId}</Text>
            )}

            <View style={tw`mt-4`}></View>
            <Input
              Icon={<Feather name="map-pin" size={24} color="silver" />}
              placeholder="Address"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              borderColor={touched.address && errors.address ? "red" : "gray"}
            />
            {touched.address && errors.address && (
              <Text style={tw`text-red-500`}>{errors.address}</Text>
            )}

            <View style={tw`mt-4`}>
              <Input
                Icon={<Feather name="lock" size={24} color="silver" />}
                placeholder="Password"
                security={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                borderColor={
                  touched.password && errors.password ? "red" : "gray"
                }
              />
              {touched.password && errors.password && (
                <Text style={tw`text-red-500`}>{errors.password}</Text>
              )}
            </View>

            <View style={tw`mt-8`}>
              <Button
                mode={"contained"}
                style={tw`bg-[#097969] w-full p-[10] mt-4`}
                onPress={handleSubmit}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <View style={tw`mt-4`}>
                  <Text style={tw`text-xl underline text-gray-500`}>
                    Have account? Login
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
