/* eslint-disable */
import type { Prisma, Like, Dislike, Flag, Post, Account, Session, User, VerificationToken } from "@prisma/client";
export default interface PrismaTypes {
    Like: {
        Name: "Like";
        Shape: Like;
        Include: Prisma.LikeInclude;
        Select: Prisma.LikeSelect;
        OrderBy: Prisma.LikeOrderByWithRelationInput;
        WhereUnique: Prisma.LikeWhereUniqueInput;
        Where: Prisma.LikeWhereInput;
        Create: {};
        Update: {};
        RelationName: "post" | "author";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Name: "Post";
            };
            author: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Dislike: {
        Name: "Dislike";
        Shape: Dislike;
        Include: Prisma.DislikeInclude;
        Select: Prisma.DislikeSelect;
        OrderBy: Prisma.DislikeOrderByWithRelationInput;
        WhereUnique: Prisma.DislikeWhereUniqueInput;
        Where: Prisma.DislikeWhereInput;
        Create: {};
        Update: {};
        RelationName: "post" | "author";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Name: "Post";
            };
            author: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Flag: {
        Name: "Flag";
        Shape: Flag;
        Include: Prisma.FlagInclude;
        Select: Prisma.FlagSelect;
        OrderBy: Prisma.FlagOrderByWithRelationInput;
        WhereUnique: Prisma.FlagWhereUniqueInput;
        Where: Prisma.FlagWhereInput;
        Create: {};
        Update: {};
        RelationName: "post" | "author";
        ListRelations: never;
        Relations: {
            post: {
                Shape: Post;
                Name: "Post";
            };
            author: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: {};
        Update: {};
        RelationName: "author" | "likes" | "dislikes" | "flagged";
        ListRelations: "likes" | "dislikes" | "flagged";
        Relations: {
            author: {
                Shape: User | null;
                Name: "User";
            };
            likes: {
                Shape: Like[];
                Name: "Like";
            };
            dislikes: {
                Shape: Dislike[];
                Name: "Dislike";
            };
            flagged: {
                Shape: Flag[];
                Name: "Flag";
            };
        };
    };
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "posts" | "Account" | "sessions" | "likes" | "dislikes" | "flags";
        ListRelations: "posts" | "Account" | "sessions" | "likes" | "dislikes" | "flags";
        Relations: {
            posts: {
                Shape: Post[];
                Name: "Post";
            };
            Account: {
                Shape: Account[];
                Name: "Account";
            };
            sessions: {
                Shape: Session[];
                Name: "Session";
            };
            likes: {
                Shape: Like[];
                Name: "Like";
            };
            dislikes: {
                Shape: Dislike[];
                Name: "Dislike";
            };
            flags: {
                Shape: Flag[];
                Name: "Flag";
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}