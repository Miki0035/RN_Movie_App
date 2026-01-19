import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new TablesDB(client);

// Track searches made by the user
export const updateSearchCount = async (query: string, movie: Movie) => {
    // check if search record exists
    // if doc exists increment searchCount field
    // else create new doc , and update count 1
    try {
        const result = await database.listRows({
            databaseId,
            tableId,
            queries: [Query.equal("searchTerm", query)],
        });

        if (result.rows.length > 0) {
            const existingMovie = result.rows[0];
            console.log("row exists and upadteCount", result.rows[0]);
            await database.updateRow({
                databaseId,
                tableId: tableId,
                rowId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1,
                },
            });
        } else {
            console.log("row doesn't exists and create row", result.rows[0]);
            await database.createRow({
                databaseId,
                tableId,
                rowId: ID.unique(),
                data: {
                    searchTerm: query,
                    movieId: movie.id,
                    title: movie.title,
                    count: 1,
                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                },
            });
        }
    } catch (error) {
        console.error("Something went wrong:", error);
        throw error;
    }
};
