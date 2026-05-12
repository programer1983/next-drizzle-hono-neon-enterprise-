import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/* ========= SCHEMA ================================================================================== */

// USERS SCHEMA
export const users = pgTable("users", {
  id: text().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// PRODUCTS SCHEMA
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// COMMENTS SCHEMA
export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* ========= RELATIONS ================================================================================== */

// USER RELATIONS
export const userRelation = relations(users, ({ many }) => ({
  products: many(products),
  comments: many(comments),
}));

// PRODUCT RELATIONS
export const productsRelation = relations(products, ({ one, many }) => ({
  comments: many(comments),
  user: one(users, { fields: [products.userId], references: [users.id] }),
}));

// COMMENT RELATIONS
export const commentsRelation = relations(comments, ({ one }) => ({
  user: one(users, { fields: [comments.userId], references: [users.id] }),
  product: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
}));

/* ========= TYPES ================================================================================== */

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
