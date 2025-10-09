// Example of advanced Promise patterns

// 1. Creating a basic promise
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// 2. Promise chaining
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        delay(1000)
            .then(() => {
                if (userId > 0) {
                    resolve({ id: userId, name: "User " + userId });
                } else {
                    reject("Invalid user ID");
                }
            });
    });
};

// 3. Promise.all - parallel execution
const fetchMultipleUsers = (userIds) => {
    const promises = userIds.map(id => fetchUserData(id));
    return Promise.all(promises);
};

// 4. Promise.race - gets first resolved promise
const fetchWithTimeout = (timeoutMs) => {
    const dataPromise = fetchUserData(1);
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject('Request timed out'), timeoutMs);
    });
    
    return Promise.race([dataPromise, timeoutPromise]);
};

// 5. Async/await usage
async function main() {
    try {
        // Sequential execution
        const user1 = await fetchUserData(1);
        console.log('User 1:', user1);

        // Parallel execution
        const users = await fetchMultipleUsers([2, 3, 4]);
        console.log('Multiple users:', users);

        // Race condition with timeout
        const timeoutUser = await fetchWithTimeout(2000);
        console.log('Fetched with timeout:', timeoutUser);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the example
main();