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

    const posts = await db.Post.findAll({ include: db.User }).catch(e => {
        console.error('Unable to fetch posts:', e.message);
    })
    for (const post of posts) {
        console.log(post.toJSON());
    }
    console.log(`Posts: ${posts.length}`);
}

main()