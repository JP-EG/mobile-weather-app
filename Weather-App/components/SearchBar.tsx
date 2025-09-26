import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import searchImg from '@/assets/images/search.png';

type Props = {
    onChangeText: (text: string) => void;
    onSearchPress: () => void;
    value?: string;
};

const SearchBar = ({ onChangeText, onSearchPress, value }: Props) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.textInput}
            placeholder="Search City"
            placeholderTextColor="#ccc"
            onChangeText={onChangeText}
            value={value}
        />
        <TouchableOpacity onPress={onSearchPress}>
            <Image source={searchImg} style={styles.searchIcon} />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 20,
        margin: 15,
        height: 60,
        paddingHorizontal: 10,
    },
    textInput: {
        flex: 1,
        color: 'white',
        height: 50,
        padding: 10,
        borderWidth: 0,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginLeft: 8,
        tintColor: 'white',
    },
});

export default SearchBar;