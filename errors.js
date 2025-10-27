// Custom error classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class DatabaseError extends Error {
    constructor(message, query) {
        super(message);
        this.name = 'DatabaseError';
        this.query = query;
        this.timestamp = new Date();
    }
}

// Error handler wrapper for async functions
const asyncHandler = (fn) => async (...args) => {
    try {
        return await fn(...args);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`Validation failed for field "${error.field}":`, error.message);
            // Handle validation errors
        } else if (error instanceof DatabaseError) {
            console.error(`Database error at ${error.timestamp}:`, error.message);
            console.error('Failed query:', error.query);
            // Log to monitoring system
        } else {
            console.error('Unexpected error:', error);
            // Send to error reporting service
        }
        throw error; // Re-throw for upstream handling
    }
};

// Example usage
const validateUser = (user) => {
    if (!user.email) {
        throw new ValidationError('Email is required', 'email');
    }
    if (!user.password || user.password.length < 8) {
        throw new ValidationError('Password must be at least 8 characters', 'password');
    }
};

const simulateDbQuery = async (query) => {
    const random = Math.random();
    if (random < 0.5) {
        throw new DatabaseError('Connection timeout', query);
    }
    return { success: true };
};

// Using the error handler
const createUser = asyncHandler(async (userData) => {
    validateUser(userData);
    
    const query = `INSERT INTO users (email, password) VALUES (${userData.email}, ***)`;
    await simulateDbQuery(query);
    
    return { status: 'success', message: 'User created' };
});

// Test the error handling
async function testErrorHandling() {
    try {
        // Test validation error
        await createUser({ email: '', password: '123' });
    } catch (e) {
        console.log('Caught validation error (expected)');
    }

    try {
        // Test database error
        await createUser({ email: 'test@example.com', password: 'password123' });
    } catch (e) {
        console.log('Caught database error (might occur)');
    }
}

// Run the test
testErrorHandling();