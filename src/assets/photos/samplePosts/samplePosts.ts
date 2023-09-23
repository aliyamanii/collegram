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
    imageUrl: canon,
    likeCount: 10,
    bookmarkCount: 5,
    commentCount: 3,
    details: "This is a beautiful image of a Canon camera.",
    tags: ["camera", "photography"],
    postDate: 123456789,
  },
  {
    id: 1,
    user: "ناصر حسین زاده",
    imageUrl: chair,
    likeCount: 15,
    bookmarkCount: 7,
    commentCount: 5,
    details: "A vintage chair in a cozy room setting.",
    tags: ["furniture", "interior"],
    postDate: 987654321,
  },
  {
    id: 2,
    user: "امیر محمد مهری",
    imageUrl: chess,
    likeCount: 8,
    bookmarkCount: 3,
    commentCount: 2,
    details: "A close-up of a chessboard with chess pieces.",
    tags: ["chess", "strategy"],
    postDate: 567890123,
  },
  {
    id: 3,
    user: "username4",
    imageUrl: dragon,
    likeCount: 20,
    bookmarkCount: 12,
    commentCount: 8,
    details: "An illustration of a fierce dragon in flight.",
    tags: ["fantasy", "mythical"],
    postDate: 234567890,
  },
  {
    id: 4,
    user: "username5",
    imageUrl: drugs,
    likeCount: 7,
    bookmarkCount: 2,
    commentCount: 1,
    details: "Colorful pills and capsules arranged in a pattern.",
    tags: ["medicine", "health"],
    postDate: 345678901,
  },
  {
    id: 5,
    user: "username6",
    imageUrl: elephant,
    likeCount: 12,
    bookmarkCount: 6,
    commentCount: 4,
    details: "A majestic elephant walking in the wild.",
    tags: ["wildlife", "nature"],
    postDate: 678901234,
  },
  {
    id: 6,
    user: "username7",
    imageUrl: leaves,
    likeCount: 18,
    bookmarkCount: 9,
    commentCount: 6,
    details: "Close-up of vibrant green leaves in sunlight.",
    tags: ["nature", "foliage"],
    postDate: 789012345,
  },
  {
    id: 7,
    user: "username8",
    imageUrl: mill,
    likeCount: 6,
    bookmarkCount: 1,
    commentCount: 2,
    details: "An old windmill against a cloudy sky.",
    tags: ["windmill", "landscape"],
    postDate: 890123456,
  },
  {
    id: 8,
    user: "username9",
    imageUrl: ostrich,
    likeCount: 14,
    bookmarkCount: 4,
    commentCount: 3,
    details: "A curious ostrich in an open field.",
    tags: ["wildlife", "bird"],
    postDate: 123890456,
  },
  {
    id: 9,
    user: "username10",
    imageUrl: reptile,
    likeCount: 9,
    bookmarkCount: 3,
    commentCount: 2,
    details: "A reptile basking in the sun on a rock.",
    tags: ["reptile", "nature"],
    postDate: 345678901,
  },
  {
    id: 10,
    user: "username11",
    imageUrl: ropes,
    likeCount: 5,
    bookmarkCount: 2,
    commentCount: 1,
    details: "Coiled ropes on a dock by the sea.",
    tags: ["rope", "dock"],
    postDate: 456789012,
  },
  {
    id: 11,
    user: "username12",
    imageUrl: spring,
    likeCount: 11,
    bookmarkCount: 5,
    commentCount: 3,
    details: "Random spring which probably came out of a heavy machine",
    tags: ["spring", "mechanics"],
    postDate: 890123456,
  },
];

export { samplePosts };
