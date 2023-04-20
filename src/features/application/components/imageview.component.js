import { useEffect } from "react";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import {View,Image} from "react-native"
import { manipulateAsync } from "expo-image-manipulator";
export const ImageView=({route})=>{
    const {uri} = route.params;
    // const loadImageToArray = async (uri) => {
    //   const image = await manipulateAsync(
    //     uri,
    //     [{ resize: { width: 255, height: 255 } }],
    //     {format:"png"},
    //   );
    //   const imageArray = await loadImageDataToArray(image);
    //   console.log(imageArray);
    //   return imageArray;
    // };
    
    // // Function to convert loaded image data to a 3D array
    // const loadImageDataToArray = async (image) => {
    //   const { iuri } = image;
    //   const resp = (await fetch(iuri));
    //   //.then(response=>console.log(response.blob()));
    //   //const blob = await response;//.blob();
    //   // const arrayBuffer = await blob.arrayBuffer();
    //   // const byteArray = new Uint8Array(arrayBuffer);
    //   // const imageData = new ImageData(byteArray, width, height);
    //   // const imageDataArray = new Array(width).fill(null).map(() => new Array(height).fill(null).map(() => new Array(3).fill(null)));
    //   // console.log(image);
    //   // for (let i = 0; i < width; i++) {
    //   //   for (let j = 0; j < height; j++) {
    //   //     const index = (j * width + i) * 4;
    //   //     imageDataArray[i][j][0] = imageData.data[index];
    //   //     imageDataArray[i][j][1] = imageData.data[index + 1];
    //   //     imageDataArray[i][j][2] = imageData.data[index + 2];
    //   //   }
    //   // }
    //   // return imageDataArray;
    //   return resp;
    // };
    

    return (
        <SafeArea>
                 <View style={{ flex: 1 }} 
                 >
          <Image
            source={{ uri: uri }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        </View>
        </SafeArea>
    )



}