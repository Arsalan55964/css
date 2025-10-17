// Advanced Date Manipulation Examples

// 1. Creating Dates
const now = new Date();
const specificDate = new Date('2025-10-17');
const customDate = new Date(2025, 9, 17, 15, 30, 0); // Month is 0-based

// 2. Date Formatting Functions
function formatDate(date) {
    const options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    };
    return date.toLocaleDateString('en-US', options);
}

// 3. Date Calculations
class DateCalculator {
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    static getDaysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }

    static getAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}

// 4. Date Components
function getDateComponents(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // Adding 1 since months are 0-based
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
        dayOfWeek: date.getDay() // 0 = Sunday, 6 = Saturday
    };
}

// 5. Testing Date Functions
function demonstrateDates() {
    console.log('Current Date:', formatDate(now));
    console.log('Specific Date:', formatDate(specificDate));
    console.log('Custom Date:', formatDate(customDate));

    // Date calculations
    const futureDate = DateCalculator.addDays(now, 30);
    console.log('\nDate in 30 days:', formatDate(futureDate));
    console.log('Days between:', DateCalculator.getDaysBetween(now, futureDate));

    // Age calculation
    const birthDate = new Date(1990, 0, 1); // January 1, 1990
    console.log('\nAge:', DateCalculator.getAge(birthDate));

    // Date components
    console.log('\nDate Components:', getDateComponents(now));

    // ISO Strings and Timestamps
    console.log('\nISO String:', now.toISOString());
    console.log('Timestamp:', now.getTime());

    // Different formats
    console.log('\nDifferent Formats:');
    console.log('Local:', now.toLocaleString());
    console.log('UTC:', now.toUTCString());
    console.log('ISO:', now.toISOString());
}

// Run the demonstration
demonstrateDates();