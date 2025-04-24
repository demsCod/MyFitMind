import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'

interface DateProps {
  date: string | Date;
  onSelectDate: (date: string) => void;
  selected: string;
}

const Date = ({ date, onSelectDate, selected }: DateProps) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const itCurrentDay = moment(date).isSame(moment(), 'day')
  const day =  moment(date).format('ddd').toUpperCase()
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D')

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD')

  return itCurrentDay ? (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { backgroundColor: "" }]}
    >
      <Text
        style={[styles.big, selected === fullDate && { color: "#fff" }]}
        className='text-white'
      >
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 24 },
        ]}
      >
        {dayNumber}
      </Text>
      <View style={{ width: 20, height: 2, backgroundColor: 'grey', marginTop: 5 }} />
   
    </TouchableOpacity>
  ) : (
    
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { backgroundColor: "accent" }]}
    >
      <Text
        style={[styles.big, selected === fullDate && { color: "#fff" }]}
      >
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 24 },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  )
}

export default Date

const styles = StyleSheet.create({
  card: {

    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 80,
    width: 60,
    marginHorizontal: -7,
  },
  big: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#717C89',
    fontSize: 12,
  },
  selected: {
    backgroundColor: '#3772FF',
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 80,
    width: 60,
    marginHorizontal: 0,
    borderWidth: 1,
  },
  medium: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: 'white',
  },
})