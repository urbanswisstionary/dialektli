/* eslint-disable */
import type { Prisma, Like, Dislike, Flag, Term, TermExample, Synonym, Account, Session, User, VerificationToken } from "@prisma/client";
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
        RelationName: "term" | "author";
        ListRelations: never;
        Relations: {
            term: {
                Shape: Term;
                Name: "Term";
                Nullable: false;
            };
            author: {
                Shape: User;
                Name: "User";
                Nullable: false;
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
        RelationName: "term" | "author";
        ListRelations: never;
        Relations: {
            term: {
                Shape: Term;
                Name: "Term";
                Nullable: false;
            };
            author: {
                Shape: User;
                Name: "User";
                Nullable: false;
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
        RelationName: "term" | "author";
        ListRelations: never;
        Relations: {
            term: {
                Shape: Term;
                Name: "Term";
                Nullable: false;
            };
            author: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Term: {
        Name: "Term";
        Shape: Term;
        Include: Prisma.TermInclude;
        Select: Prisma.TermSelect;
        OrderBy: Prisma.TermOrderByWithRelationInput;
        WhereUnique: Prisma.TermWhereUniqueInput;
        Where: Prisma.TermWhereInput;
        Create: {};
        Update: {};
        RelationName: "author" | "likes" | "dislikes" | "flagged" | "synonymOf" | "synonyms" | "examples";
        ListRelations: "likes" | "dislikes" | "flagged" | "synonymOf" | "synonyms" | "examples";
        Relations: {
            author: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
            likes: {
                Shape: Like[];
                Name: "Like";
                Nullable: false;
            };
            dislikes: {
                Shape: Dislike[];
                Name: "Dislike";
                Nullable: false;
            };
            flagged: {
                Shape: Flag[];
                Name: "Flag";
                Nullable: false;
            };
            synonymOf: {
                Shape: Synonym[];
                Name: "Synonym";
                Nullable: false;
            };
            synonyms: {
                Shape: Synonym[];
                Name: "Synonym";
                Nullable: false;
            };
            examples: {
                Shape: TermExample[];
                Name: "TermExample";
                Nullable: false;
            };
        };
    };
    TermExample: {
        Name: "TermExample";
        Shape: TermExample;
        Include: Prisma.TermExampleInclude;
        Select: Prisma.TermExampleSelect;
        OrderBy: Prisma.TermExampleOrderByWithRelationInput;
        WhereUnique: Prisma.TermExampleWhereUniqueInput;
        Where: Prisma.TermExampleWhereInput;
        Create: {};
        Update: {};
        RelationName: "term" | "author";
        ListRelations: never;
        Relations: {
            term: {
                Shape: Term;
                Name: "Term";
                Nullable: false;
            };
            author: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
        };
    };
    Synonym: {
        Name: "Synonym";
        Shape: Synonym;
        Include: Prisma.SynonymInclude;
        Select: Prisma.SynonymSelect;
        OrderBy: Prisma.SynonymOrderByWithRelationInput;
        WhereUnique: Prisma.SynonymWhereUniqueInput;
        Where: Prisma.SynonymWhereInput;
        Create: {};
        Update: {};
        RelationName: "synonymOf" | "synonym";
        ListRelations: never;
        Relations: {
            synonymOf: {
                Shape: Term;
                Name: "Term";
                Nullable: false;
            };
            synonym: {
                Shape: Term;
                Name: "Term";
                Nullable: false;
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
                Nullable: false;
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
                Nullable: false;
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
        RelationName: "terms" | "accounts" | "sessions" | "likes" | "dislikes" | "flags" | "examples";
        ListRelations: "terms" | "accounts" | "sessions" | "likes" | "dislikes" | "flags" | "examples";
        Relations: {
            terms: {
                Shape: Term[];
                Name: "Term";
                Nullable: false;
            };
            accounts: {
                Shape: Account[];
                Name: "Account";
                Nullable: false;
            };
            sessions: {
                Shape: Session[];
                Name: "Session";
                Nullable: false;
            };
            likes: {
                Shape: Like[];
                Name: "Like";
                Nullable: false;
            };
            dislikes: {
                Shape: Dislike[];
                Name: "Dislike";
                Nullable: false;
            };
            flags: {
                Shape: Flag[];
                Name: "Flag";
                Nullable: false;
            };
            examples: {
                Shape: TermExample[];
                Name: "TermExample";
                Nullable: false;
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