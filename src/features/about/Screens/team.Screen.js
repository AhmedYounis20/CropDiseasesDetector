import { FlatList, Text, View } from "react-native";
import { SafeArea } from "../../../components/SafeArea/SafeArea.Component";
import { DeveloperInfoCard } from "../../../components/Cards/developer-card.component";
import { develpers } from "../../../services/about/team.mock";
export const TeamScreen = () => {
  return (
    <SafeArea>
        <View style={{padding:20}}>
            <Text style={{fontSize:30,fontStyle:"italic",color:"violet"}}>
                Team
            </Text>
        </View>
      <FlatList
      data={develpers}
      renderItem={({item})=>{
        return <DeveloperInfoCard developer={item} />
      }}
      keyExtractor={item=>item.name}
      />    
    </SafeArea>
  );
};