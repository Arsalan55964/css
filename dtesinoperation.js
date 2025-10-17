// Modern JavaScript Date Examples

// 1. Basic Date Operations
class DateOperations {
    static getCurrentDate() {
        return new Date();
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'long'
        }).format(date);
    }

    static getCustomDate(year, month, day) {
        // Note: month is 0-based (0-11)
        return new Date(year, month - 1, day);
    }

    static getDateDifference(date1, date2) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}

// 2. Date Formatting and Manipulation
class DateFormatter {
    static getRelativeTime(date) {
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
        const now = new Date();
        const diffInDays = Math.round((date - now) / (1000 * 60 * 60 * 24));
        
        return rtf.format(diffInDays, 'day');
    }

    static formatToLocalTime(date, locale = 'en-US') {
        return date.toLocaleTimeString(locale, {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// 3. Date Calculator
class DateCalculator {
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
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

// Example Usage
function demonstrateDateOperations() {
    // Current date
    const now = DateOperations.getCurrentDate();
    console.log('Current Date:', DateOperations.formatDate(now));

    // Custom date
    const customDate = DateOperations.getCustomDate(2025, 10, 17);
    console.log('Custom Date:', DateOperations.formatDate(customDate));

    // Date difference
    const diffDays = DateOperations.getDateDifference(now, customDate);
    console.log('Days difference:', diffDays);

    // Relative time
    console.log('Relative time:', DateFormatter.getRelativeTime(customDate));

    // Local time
    console.log('Local time:', DateFormatter.formatToLocalTime(now));

    // Age calculation
    const birthDate = new Date(1990, 0, 1); // January 1, 1990
    console.log('Age:', DateCalculator.getAge(birthDate));

    // Add days
    const futureDate = DateCalculator.addDays(now, 30);
    console.log('Date after 30 days:', DateOperations.formatDate(futureDate));
}

// Run the demonstration
demonstrateDateOperations();