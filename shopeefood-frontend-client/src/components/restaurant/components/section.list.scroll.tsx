import { APP_COLOR } from "@/utils/constant";
import { useRef, useState } from "react";
import { Button, FlatList, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View, ViewToken } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import debounce from "debounce";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});
const SectionListScroll = () => {
    const sectionListRef = useRef<SectionList>(null);
    const flatListRef = useRef<FlatList>(null);

    const [activeMenuIndex, setActiveMenuIndex] = useState<number | string>(0);

    const DATA = [
        {
            title: 'Main dishes',
            data: ['Pizza', 'Burger', 'Risotto'],
            index: 0,
            key: 'menu-0'
        },
        {
            title: 'Sides',
            data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
            index: 1,
            key: 'menu-1'
        },
        {
            title: 'Drinks',
            data: ['Water', 'Coke', 'Beer'],
            index: 2,
            key: 'menu-2'
        },
        {
            title: 'Desserts',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 3,
            key: 'menu-3'
        },
        {
            title: 'Desserts1',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 4,
            key: 'menu-4'
        },
        {
            title: 'Desserts2',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 5,
            key: 'menu-5'
        },
        {
            title: 'Desserts3',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 6,
            key: 'menu-6'
        },
        {
            title: 'Desserts4',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 7,
            key: 'menu-7'
        },
        {
            title: 'Desserts5',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 8,
            key: 'menu-8'
        },
        {
            title: 'Desserts 9',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 9,
            key: 'menu-9'
        },
        {
            title: 'Desserts10',
            data: ['Cheese Cake', 'Ice Cream'],
            index: 10,
            key: 'menu-10'
        },
        {
            title: 'Desserts11',
            data: ['Cheese Cake', 'Ice Cream', 'Cheese Cake', 'Ice Cream'],
            index: 11,
            key: 'menu-11'
        },
    ];

    const handleScrollToLocation = () => {
        sectionListRef.current?.scrollToLocation({
            sectionIndex: 1,
            itemIndex: 2,

        })
    }

    const onViewableItemsChanged = useRef(
        debounce(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
            if (viewableItems.length > 0) {
                const visibleSectionIndex = viewableItems[0].section.index;
                setActiveMenuIndex(visibleSectionIndex)
                flatListRef.current?.scrollToIndex({ index: visibleSectionIndex, animated: true });
            }
        }, 50)
    ).current;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 10, paddingBottom: 100 }}>
                <View>
                    <Button title="Test Scroll" onPress={handleScrollToLocation} />
                </View>
                <FlatList
                    ref={flatListRef}
                    data={DATA}
                    horizontal

                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index}
                            onPress={() => {
                                sectionListRef.current?.scrollToLocation({
                                    sectionIndex: item.index,
                                    itemIndex: 0,
                                })
                            }}
                        >
                            <View style={{
                                borderBottomColor: APP_COLOR.ORANGE,
                                borderBottomWidth: item.index === activeMenuIndex ? 2 : 0
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#007AFF',
                                    marginHorizontal: 5,
                                }}>{item.title}</Text>
                            </View>


                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}

                />
                <SectionList
                    stickySectionHeadersEnabled={true}
                    ref={sectionListRef}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{
                        // itemVisiblePercentThreshold: 50, //means if 50% of the item is visible
                        waitForInteraction: true,
                        viewAreaCoveragePercentThreshold: 50
                    }}

                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => (
                        <View style={styles.item}>
                            <Text style={styles.title}>{item} - {index + 1}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title, index } }) => (
                        <Text style={styles.header}>{title} - {index} - 0 </Text>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default SectionListScroll;