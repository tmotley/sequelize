const  db  = require('./models');
// Test the connection
async function main() {
    await db.sequelize.authenticate().catch(e => {
        console.error('Unable to connect to the database:', e.message);
    })
    console.log('Connection has been established successfully.');

    if (process.env.DB_SYNC === 'true') {
        const syncResult = await db.sequelize.sync({force: true}).catch(e => {
            console.error('Unable to sync the database:', e.message);
        })

        console.log(`Database synced successfully: ${Object.keys(syncResult.models)} models synced`);
    }

    // Create a User
    const user = await db.User.create({
        name: 'Test User',
        email: 'test@test.com',
    }).catch(e => {
        console.error('Unable to create user:', e.message);
    })
    console.log('User created:', user.toJSON());

    // Create a Post
    const post = await db.Post.create({
        title: 'Test Post',
        body: 'This is a test post',
        author: user.id,
    }).catch(e => {
        console.error('Unable to create post:', e.message);
        return null;
    })
    console.log('Post created:', post.toJSON());

    // Get all Posts and eager load the related User for each
    console.log('Fetching all posts and their users...');
    const posts = await db.Post.findAll({
        include: {
            model: db.User,
            as: 'blogAuthor'
        },
    }).catch(e => {
        console.error('Unable to fetch posts:', e.message);
        return [];
    })
    console.log(`Posts found: ${posts.length}`);
    if (posts.length > 0) {
        for (const post of posts) {
            console.log("Next Post: \n");
            console.log(post.toJSON());
        }
    }

    // Get a User and retrieve all Posts for that User
    console.log('Fetching all users and their posts...');
    const users = await db.User.findAll({}).catch(e => {
        console.error('Unable to fetch users:', e.message);
        return [];
    })

    for (const user of users) {
        const userPosts = await db.Post.findAll({
            where: {
                author: user.id
            }
        }).catch(e => {
            console.error('Unable to fetch user posts:', e.message);
            return [];
        })
        console.log(`Posts for user ${user.name}:`);
        for (const post of userPosts) {
            console.log(post.toJSON());
        }
        console.log(`Done fetching posts for user ${user.name}`);
    }
}

main()