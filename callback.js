// Simulating database operations with callbacks

// Helper function to simulate delay
function simulateDelay(callback) {
    setTimeout(callback, 1000);
}

// User operations
function getUser(userId, callback) {
    simulateDelay(() => {
        const user = {
            id: userId,
            name: "User " + userId
        };
        callback(null, user);
    });
}

function getUserPosts(userId, callback) {
    simulateDelay(() => {
        const posts = [
            { id: 1, title: `Post 1 by user ${userId}` },
            { id: 2, title: `Post 2 by user ${userId}` }
        ];
        callback(null, posts);
    });
}

function getPostComments(postId, callback) {
    simulateDelay(() => {
        const comments = [
            { id: 1, text: `Comment 1 on post ${postId}` },
            { id: 2, text: `Comment 2 on post ${postId}` }
        ];
        callback(null, comments);
    });
}

// Example of nested callbacks (callback hell)
console.log("Starting nested callbacks...");
getUser(1, (error, user) => {
    if (error) {
        console.error("Error fetching user:", error);
        return;
    }
    console.log("User:", user);

    getUserPosts(user.id, (error, posts) => {
        if (error) {
            console.error("Error fetching posts:", error);
            return;
        }
        console.log("Posts:", posts);

        getPostComments(posts[0].id, (error, comments) => {
            if (error) {
                console.error("Error fetching comments:", error);
                return;
            }
            console.log("Comments:", comments);
        });
    });
});

// Better way to handle multiple callbacks using named functions
function handleComments(error, comments) {
    if (error) {
        console.error("Error fetching comments:", error);
        return;
    }
    console.log("Comments (better way):", comments);
}

function handlePosts(error, posts) {
    if (error) {
        console.error("Error fetching posts:", error);
        return;
    }
    console.log("Posts (better way):", posts);
    getPostComments(posts[0].id, handleComments);
}

function handleUser(error, user) {
    if (error) {
        console.error("Error fetching user:", error);
        return;
    }
    console.log("User (better way):", user);
    getUserPosts(user.id, handlePosts);
}

// Better organized callbacks
console.log("\nStarting better organized callbacks...");
getUser(1, handleUser);