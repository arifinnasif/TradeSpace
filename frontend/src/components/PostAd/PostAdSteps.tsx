"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ButtonGroup,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';


import Layout from "../../layout/Layout";
import PostAdForm from "./PostAdForm";
import Step1 from "./PostAdStep1Components";
import Step2 from "./PostAdStep2Components";
import Step3 from "./PostAdStep3Components";
import Step4 from "./PostAdStep4Components";

import { adService } from "../../services/ad.service";
import { LatLng } from "leaflet";

const PostAdComponent = () => {

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);

  
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // declaration of states
  const [category, setCategory] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [is_sell_ad, setIs_sell_ad] = useState<boolean>(false)
  const [description, setDescription] = useState<string>()
  const [is_negotiable, setIs_negotiable] = useState<boolean>(false)
  const [is_used, setIs_used] = useState<boolean>(false)
  const [years_used, setYears_used] = useState<number>()
  const [months_used, setMonths_used] = useState<number>()
  const [days_used, setDays_used] = useState<number>()
  const [is_phone_public, setIs_phone_public] = useState<boolean>(false)
  const [address, setAddress] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [images, setImages] = useState<string[]>([])
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const initialPosition = new LatLng(51.5704, 0.1276);
  const [mapCenter, setMapCenter] = useState<LatLng>(initialPosition);



  // after pressing next button
  const handleNextStep = () => {
    setStep(step + 1);
    if (step === 4) {
      setProgress(100);
    } else {
      setProgress(progress + 25);
    }
  };



  // after pressing previous button
  const handlePrevStep = () => {
    setStep(step - 1);
    setProgress(progress - 25);
  };


  // after pressing submit button
  const handleSubmit = async () => {
    console.log(category)
    console.log(title)
    console.log(is_sell_ad)
    console.log(description)
    console.log(is_negotiable)
    console.log(is_used)
    console.log(years_used)
    console.log(months_used)
    console.log(days_used)
    console.log(is_phone_public)
    console.log(address)
    console.log(price)
    console.log(images)

    try{
      const response = await adService.postAd({
        category_name: category,
        title: title,
        is_sell_ad: is_sell_ad,
        description: description,
        is_negotiable: is_negotiable,
        is_used: is_used,
        usage_time: {
          years: years_used,
          months: months_used,
          days: days_used
        },
        is_phone_public: is_phone_public,
        address: address,
        price: price,
        images: images
      })

      console.log(response)
      navigate("/")
    } catch(error) {
      console.log(error)
    }

  };


  // calculate navbar height
  // const [navbarHeight, setNavbarHeight] = useState(0);

  // useEffect(() => {
  //   const navbarElement = document.getElementById("navbar");
  //   if (navbarElement) {
  //     const height = navbarElement.clientHeight;
  //     setNavbarHeight(height);
  //   }
  // }, []);
  // for now fixed height 60 will be used


  return (
    <>
      <Layout title="Hello" loading={isLoading}>
        {/* stick to it's position */}
        <Progress value={progress} 
                  size="xs"  
                  colorScheme="teal" 
                  position="sticky" 
                  top="60px"
                  zIndex="sticky" 
        />
        {step === 1 && <PostAdForm header="Tell us about your product" 
                                   formContent= {<Step1 onNext={handleNextStep} 
                                                        category={category} 
                                                        setCategory={setCategory}
                                                        title={title}
                                                        setTitle={setTitle}
                                                        description={description}
                                                        setDescription={setDescription} 
                                                />} 
                       />
        }
        {step === 2 && <PostAdForm header="Choose the properties of your Ad" 
                                   formContent={<Step2 onPrev={handlePrevStep}
                                                       onNext={handleNextStep}
                                                       is_sell_ad={is_sell_ad}
                                                       price={price}
                                                       is_negotiable={is_negotiable}
                                                       is_used={is_used}
                                                       years_used={years_used}
                                                       months_used={months_used}
                                                       days_used={days_used}
                                                       setIsSellAd={setIs_sell_ad}
                                                       setPrice={setPrice}
                                                       setIsNegotiable={setIs_negotiable}
                                                       setIsUsed={setIs_used}
                                                       setYearsUsed={setYears_used}
                                                       setMonthsUsed={setMonths_used}
                                                       setDaysUsed={setDays_used}
                                               />} 
                        />
        }
        {step === 3 && <PostAdForm header="Choose Images and Address for transaction" 
                                   formContent={<Step3  onPrev={handlePrevStep}
                                                        onNext={handleNextStep}
                                                        images={images}
                                                        is_phone_public={is_phone_public}
                                                        address={address}
                                                        markerPosition={markerPosition}
                                                        mapCenter={mapCenter}
                                                        setImages={setImages}
                                                        setIsPhonePublic={setIs_phone_public}
                                                        setAddress={setAddress}
                                                        setMarkerPosition={setMarkerPosition}
                                                        setMapCenter={setMapCenter}
                                               />} 
                       />
        }
        {step === 4 && <PostAdForm header="Review your Ad"
                                    formContent={<Step4 onPrev={handlePrevStep}
                                                        onSubmit={handleSubmit}
                                                        category={category}
                                                        title={title}
                                                        description={description}
                                                        is_sell_ad={is_sell_ad}
                                                        price={price}
                                                        is_negotiable={is_negotiable}
                                                        is_used={is_used}
                                                        years_used={years_used}
                                                        months_used={months_used}
                                                        days_used={days_used}
                                                        is_phone_public={is_phone_public}
                                                        address={address}
                                                        images={images}
                                                />} 
                       />
        }
      </Layout>
    </>
  );
};

export default PostAdComponent;