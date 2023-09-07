import { useState } from "react";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  style?: {};
};

const DatePicker = (props: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    Platform.OS !== "android" && setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date ? date : new Date(),
        onChange,
        mode: "date",
        is24Hour: true,
      });
    } else {
      setShow(true);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>Date</Text>
      <View style={styles.datePicker}>
        <Text style={styles.dateText}>
          {getFormattedDate(date ? date : new Date())}
        </Text>
        <Button onPress={showDatepicker}>
          <Ionicons name="calendar" color="white" size={22} />
        </Button>
        {Platform.OS !== "android" && show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? date : new Date()}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary100,
    paddingLeft: 6,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    marginBottom: 4,
    textAlign: "center",
  },
});
