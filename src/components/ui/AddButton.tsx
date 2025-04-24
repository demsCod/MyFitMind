import { Image, TouchableOpacity } from 'react-native';
import React from 'react';

const AddButton = ({ onAddPress }: { onAddPress: () => void }) => {
  return (
    <TouchableOpacity 
      className="self-center bg-grey z-10 h-[60px] w-[60px] rounded-full justify-center items-center"
      onPress={onAddPress}>
      <Image
        source={require('../../../assets/icons/plus.png')}
        className=" h-[45px] w-[45px]"
      />
    </TouchableOpacity>
  );
};

export default AddButton;
