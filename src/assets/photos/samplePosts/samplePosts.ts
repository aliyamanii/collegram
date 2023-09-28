import canon from "./canon.jpg";
import chair from "./chair.jpg";
import chess from "./chess.jpg";
import dragon from "./dragon.jpg";
import drugs from "./drugs.jpg";
import elephant from "./elephant.jpg";
import leaves from "./leaves.jpg";
import mill from "./mill.jpg";
import ostrich from "./ostrich.jpg";
import reptile from "./reptile.jpg";
import ropes from "./ropes.jpg";
import spring from "./spring.jpg";

// Generate unique IDs for each post
const samplePosts = [
  {
    id: 0,
    user: "مهتاب فروغی",
    imageUrl: [canon, chair, chess],
    likeCount: 10,
    bookmarkCount: 5,
    commentCount: 3,
    details: "This is a beautiful image of a Canon camera.",
    tags: ["camera", "photography"],
    postDate: "2023-05-15T08:42:10.123Z",
  },
  {
    id: 1,
    user: "ناصر حسین زاده",
    imageUrl: [chair],
    likeCount: 15,
    bookmarkCount: 7,
    commentCount: 5,
    details: "A vintage chair in a cozy room setting.",
    tags: ["furniture", "interior"],
    postDate: "2023-03-20T14:20:30.987Z",
  },
  {
    id: 2,
    user: "امیر محمد مهری",
    imageUrl: [chess],
    likeCount: 8,
    bookmarkCount: 3,
    commentCount: 2,
    details: "A close-up of a chessboard with chess pieces.",
    tags: ["chess", "strategy"],
    postDate: "2022-06-08T11:15:55.678Z",
  },
  {
    id: 3,
    user: "username4",
    imageUrl: [dragon],
    likeCount: 20,
    bookmarkCount: 12,
    commentCount: 8,
    details: "An illustration of a fierce dragon in flight.",
    tags: ["fantasy", "mythical"],
    postDate: "2020-08-25T17:05:45.456Z",
  },
  {
    id: 4,
    user: "username5",
    imageUrl: [drugs],
    likeCount: 7,
    bookmarkCount: 2,
    commentCount: 1,
    details: "Colorful pills and capsules arranged in a pattern.",
    tags: ["medicine", "health"],
    postDate: "2023-02-10T09:30:20.789Z",
  },
  {
    id: 5,
    user: "username6",
    imageUrl: [elephant],
    likeCount: 12,
    bookmarkCount: 6,
    commentCount: 4,
    details: "A majestic elephant walking in the wild.",
    tags: ["wildlife", "nature"],
    postDate: "2023-04-03T20:18:45.234Z",
  },
  {
    id: 6,
    user: "username7",
    imageUrl: [leaves],
    likeCount: 18,
    bookmarkCount: 9,
    commentCount: 6,
    details: "Close-up of vibrant green leaves in sunlight.",
    tags: ["nature", "foliage"],
    postDate: "2023-07-12T13:50:40.345Z",
  },
  {
    id: 7,
    user: "username8",
    imageUrl: [mill],
    likeCount: 6,
    bookmarkCount: 1,
    commentCount: 2,
    details: "An old windmill against a cloudy sky.",
    tags: ["windmill", "landscape"],
    postDate: "2022-01-30T07:22:10.890Z",
  },
  {
    id: 8,
    user: "username9",
    imageUrl: [ostrich],
    likeCount: 14,
    bookmarkCount: 4,
    commentCount: 3,
    details: "A curious ostrich in an open field.",
    tags: ["wildlife", "bird"],
    postDate: "2023-02-15T15:55:20.543Z",
  },
  {
    id: 9,
    user: "username10",
    imageUrl: [reptile],
    likeCount: 9,
    bookmarkCount: 3,
    commentCount: 2,
    details: "A reptile basking in the sun on a rock.",
    tags: ["reptile", "nature"],
    postDate: "2022-04-01T05:40:15.876Z",
  },
  {
    id: 10,
    user: "username11",
    imageUrl: [ropes],
    likeCount: 5,
    bookmarkCount: 2,
    commentCount: 1,
    details: "Coiled ropes on a dock by the sea.",
    tags: ["rope", "dock"],
    postDate: "2022-08-10T12:30:50.321Z",
  },
  {
    id: 11,
    user: "username12",
    imageUrl: [spring],
    likeCount: 11,
    bookmarkCount: 5,
    commentCount: 3,
    details: "Random spring which probably came out of a heavy machine.",
    tags: ["spring", "mechanics"],
    postDate: "2020-01-15T18:10:35.912Z",
  },
];

export { samplePosts };
