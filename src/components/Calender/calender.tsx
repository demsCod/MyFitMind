import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'
import Date from './date'

interface CalendarProps {
  onSelectDate: (date: moment.Moment) => void;
  selected: moment.Moment | null;
}

const Calendar = ({ onSelectDate, selected }: CalendarProps) => {
  const [dates, setDates] = useState<moment.Moment[]>([])

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = []
    for (let i = -5; i < 5; i++) {
      const date = moment().add(i, 'days')
      _dates.push(date)
    }
    setDates(_dates)
  }

  useEffect(() => {
    getDates()
  }, [])

  //center the date on the current date
 

 
  return (
    <>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll is a native event that returns the number of pixels the user has scrolled
            scrollEventThrottle={16}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date.toDate()}
                onSelectDate={(dateString) => onSelectDate(moment(dateString))}
                selected={selected ? selected.format('YYYY-MM-DD') : ''}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Calendar

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  dateSection: {
    width: '100%',
    padding: 1,
  },
  scroll: {
    height: 150,
  },
})