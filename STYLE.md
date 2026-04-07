# STYLE.md

Coding patterns and conventions used in this codebase. Use as a reference when writing new code.

---

## Table of Contents

1. [Component Declaration](#1-component-declaration)
2. [Export Style](#2-export-style)
3. [Prop Typing](#3-prop-typing)
4. [Conditional Rendering](#4-conditional-rendering)
5. [File and Folder Structure](#5-file-and-folder-structure)
6. [Naming Conventions](#6-naming-conventions)
7. [Import Ordering](#7-import-ordering)
8. [Tailwind Class Patterns](#8-tailwind-class-patterns)
9. [State and Effects](#9-state-and-effects)
10. [TypeScript Patterns](#10-typescript-patterns)
11. [Error Handling](#11-error-handling)
12. [Miscellaneous](#12-miscellaneous)

---

## 1. Component Declaration

### Arrow Functions (Primary)

Named `const` arrow functions are the dominant pattern.

```tsx
export const Button = ({
  className,
  size = 'base',
  ...rest
}: ButtonProps) => (
  <button ...>...</button>
)

Button.displayName = 'Button'
```

### Function Declarations (Routes and Default Exports)

Named `function` declarations are used for route-level components and default-exported feature components.

```tsx
// Route component
export function RouteComponent() {
  return <PageLayout>...</PageLayout>
}

// Feature component
export default function ProfileInfoPanel({ ... }: ProfileInfoPanelProps) {
  ...
}
```

### `.displayName` is Required on Exported Arrow Functions

Every exported `const` arrow function component must have `.displayName` set immediately after.

```tsx
const Avatar = ({ ref, ...rest }: AvatarPropsWithRef) => { ... }
Avatar.displayName = 'Avatar'
export default Avatar
```

### React 19 Ref Handling (No `forwardRef`)

Accept `ref` as a plain prop via `ref?: React.Ref<T>` in the interface.

```tsx
interface AvatarPropsWithRef extends AvatarProps {
  ref?: React.Ref<HTMLSpanElement>
}

const Avatar = ({ ref, ...rest }: AvatarPropsWithRef) => (
  <span ref={ref} {...rest} />
)
```

---

## 2. Export Style

### Default Exports (Most Component Files)

Most component files use `export default` for the main component.

```tsx
const InputText = ({ ...}: InputTextProps) => (...)
export default InputText
```

### Named Exports (Shared UI Components)

Base UI components consumed from barrel files use named exports.

```tsx
export const Button = ({ ... }: ButtonProps) => (...)
export function Modal({ ... }: ModalProps) { ... }
```

### Barrel Files (`index.ts`)

Every UI sub-folder has an `index.ts`. Use `export * from` or `export { default as X } from`.

```ts
// export * style
export * from './button'
export * from './circle-button'

// export { default as } style
export { default as FeedbackMessage } from './feedback-message'
export { default as TextField } from './text-field'
```

---

## 3. Prop Typing

### `interface` for Component Props (Primary)

Use `interface` named `<ComponentName>Props`.

```tsx
interface ModalProps extends DialogProps {
  isOpen: boolean
  onClose: () => void
  notCloseOnOverlay?: boolean
  className?: string
}
```

### `type` for Discriminated Unions

Use `type` when props have mutually exclusive shapes.

```tsx
type OwnProfileInfoProps = BaseProfileInfoProps & {
  variant: 'own'
  fullName: string
  onEditProfile: () => void
}
type VisitorProfileInfoProps = BaseProfileInfoProps & {
  variant: 'visitor'
  username: string
}
type ProfileInfoPanelProps = OwnProfileInfoProps | VisitorProfileInfoProps
```

### `extends React.ComponentPropsWithRef<'element'>` for HTML-wrapping Components

```tsx
interface MessageBubbleProps extends React.ComponentPropsWithRef<'div'> {
  message: Message
  isLoading: boolean
}

// Or inline for simple wrappers:
const CreatePostEntry = (props: React.ComponentPropsWithRef<'button'>) => { ... }
```

### JSDoc on Non-Obvious Props

```tsx
interface ButtonBaseProps extends React.ComponentPropsWithRef<'button'> {
  /** The base variant of the button. */
  variant?: ButtonVariants
  /** Renders the loading state of button. */
  isLoading?: boolean
  /** The icon component to use. `icon={PlusIcon}` */
  icon?: Icon
}
```

### Default Values in Destructuring (Not in Body)

```tsx
const InputText = ({
  type = 'text',
  disabled,
  ...rest
}: InputTextProps) => (...)
```

---

## 4. Conditional Rendering

### Ternary for Two Branches

```tsx
{isOwner ? (
  <button onClick={onEdit}>Edit</button>
) : null}
```

### `null` for Empty Branches (Never `false`)

```tsx
// Correct:
{condition ? <Component /> : null}

// Incorrect:
{condition ? <Component /> : false}
```

### `&&` for Simple Show/Hide

```tsx
{isEnabled && (
  <div className="...">Content</div>
)}
```

### Early Returns for Guards and Empty States

```tsx
if (!data) return null

if (items.length > 0) {
  return <List items={items} />
}

return <EmptyState />
```

### Nested Ternaries for Multi-Type Branching

```tsx
{media ? (
  <>
    {media.type === 'gif' ? (
      <GifContent media={media} />
    ) : !hasText ? (
      <MediaContent media={media} />
    ) : null}
  </>
) : null}
```

---

## 5. File and Folder Structure

### Feature-Based with Sub-Component Folders

```
src/components/
  ui/                          # Base reusable components
    button/
      button.tsx
      circle-button.tsx
      icon-button.tsx
      index.ts                 # Barrel
      utils/
        helpers.ts             # Style helper functions
        types.ts               # TypeScript types
        index.ts               # Re-exports utils
    avatar/
      avatar.tsx
      index.ts
      utils/
        helpers.ts
        types.ts
        index.ts
  post/
    display-post/
      post-card.tsx
      components/              # Sub-components used only inside post-card
        nsfw-content.tsx
    create-post/
      create-post-entry.tsx
  auth/
    login/
      login.tsx
      login-panel.tsx
    register/
      steps/
        email-form.tsx
      register.tsx
  skeleton/
    skeleton.tsx               # Namespace object aggregating all skeleton variants
src/routes/                    # Flat: all route-level components as files
  nearby.tsx
  explore.tsx
src/hooks/                     # Custom hooks
src/store/                     # State stores
src/lib/                       # Pure utility functions
  __tests__/                   # Unit tests for lib functions
```

### `utils/` Sub-folder Inside UI Components

UI components with variant logic get a `utils/` folder containing `helpers.ts` (functions), `types.ts` (TypeScript types), and `index.ts` (re-exports both).

### No `index.tsx` for Components

`index.ts` is reserved for barrel re-exports only. Every component has its own named file.

### Namespace Object Pattern for Variant Groups

```tsx
// src/components/skeleton/skeleton.tsx
const Skeleton = { Board, ChatRoom, Post, Notification }
export default Skeleton

// Usage:
<Skeleton.Post multiple />
<Skeleton.TileList template={<Skeleton.Post />} tileCount={3} />
```

---

## 6. Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| Files | kebab-case | `input-text.tsx`, `use-debounce.ts` |
| Components | PascalCase | `InputText`, `MessageBubble` |
| Custom hooks | `use` prefix, camelCase | `useDebounce`, `useAuthModal` |
| Interfaces/Types | PascalCase | `ButtonSizes`, `ModalProps` |
| Constants | SCREAMING_SNAKE_CASE with `as const` | `STORAGE_KEYS.AUTH_TOKEN` |
| Store hooks | `use` prefix | `useAuthModal`, `useThemeStore` |
| Event handlers (passed as props) | `on` prefix | `onModalClose`, `onSubmit` |
| Event handlers (derived/local) | `handle` prefix | `handleCreatePost`, `handleChange` |

---

## 7. Import Ordering

Enforced by `eslint-plugin-simple-import-sort`. Order:

1. CSS/style imports
2. React core
3. Internal alias imports (`@/`)
4. Parent-directory relative imports (`../`)
5. Same-directory relative imports (`./`)
6. External packages

```tsx
import './styles.css'

import { useState, useCallback } from 'react'

import { Button } from '@/components/ui/button'
import clsxm from '@/lib/clsxm'

import { LoginPanel } from '../login-panel'

import { MessageStatus } from './message-status'

import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
```

### Type Imports Always Use `type` Keyword

```ts
import { gql, type TypedDocumentNode } from '@apollo/client'
import { type Post, NearbyPostType } from '@/graphql/types'
```

---

## 8. Tailwind Class Patterns

### `clsxm` for All Dynamic or Merged Classes

Import from `@/lib/clsxm`. Never use `clsx` or `twMerge` directly.

```tsx
import clsxm from '@/lib/clsxm'

<div className={clsxm('border bg-white dark:bg-black', className)}>
```

### Object Syntax for Boolean Conditionals

```tsx
<input
  className={clsxm('peer pt-6 pb-2', {
    'pr-12': hasIcon,
    'cursor-not-allowed': disabled,
  })}
/>
```

### Semantic Typography Classes (Never Generic Tailwind Sizes)

Never use `text-sm`, `text-lg`, `text-xl`. Always use design system classes:

```tsx
// Headings:
<h3 className="text-heading-base">Title</h3>
<h3 className="text-heading-sm">Subtitle</h3>

// Labels:
<span className="text-label-sm text-dark-100">Caption</span>

// Paragraphs:
<p className="text-paragraph-sm">Body text</p>
```

### Semantic Color Classes with Dark Mode

Every color class includes a `dark:` variant.

```tsx
className="text-dark-600 dark:text-gray-300"
className="bg-true-white dark:bg-base-black"
className="border-dark-100 dark:border-gray-800"
```

### Class Ordering: Layout → Visual → State → Responsive

```tsx
className="relative flex w-full flex-col space-y-3 p-0 pb-20 md:mt-3 md:rounded-t-xl"
className="bg-true-white dark:bg-base-black flex space-x-2 rounded-xl p-2"
```

### Semantic Spacing Tokens

Use `@theme` block tokens over arbitrary values. Common decimal spacings:

```tsx
className="gap-y-1.5"
className="px-1.75"
className="h-5.5"
```

Only use arbitrary `[...]` when no semantic token exists:

```tsx
className="h-[38px]"   // acceptable when no token available
```

### Semantic Shadow Classes

```tsx
className="shadow-1"   // not shadow-sm
className="shadow-2"   // not shadow-md
```

### Variant Functions (Never String Interpolation)

Never build variant class strings via template literals like `` `text-${size}` ``. Always use explicit switch/lookup functions in `utils/helpers.ts`.

```ts
// Correct:
export function buttonSizes(size?: ButtonSizes): string {
  switch (size) {
    case 'xs': { return 'h-7 px-2 text-label-xs' }
    case 'sm': { return 'h-9 px-3 text-label-sm' }
    default:   { return 'h-10 px-4 text-label-base' }
  }
}

// Incorrect:
const sizeClass = `h-${size} px-${padding}`
```

---

## 9. State and Effects

### Functional Initializer for Derived Initial State

```tsx
const [email, setEmail] = useState(() => user?.email ?? '')
const [theme, setTheme] = useState(() => storedTheme)
```

### `useCallback` for Event Handlers Used as Dependencies

```tsx
const onModalClose = useCallback(() => {
  closeModal()
  onRemove?.()
}, [onRemove])
```

### Functional State Update Form

```tsx
const nextPage = useCallback(
  () => setCurrentStep((prev) => prev + 1),
  [],
)
```

### One Concern Per `useEffect`

Use multiple `useEffect` calls instead of combining unrelated logic.

```tsx
useEffect(() => {
  if (user) onModalClose()
}, [user, onModalClose])

useEffect(() => {
  if (redirectParam) openModal('register')
}, [redirectParam])
```

### `startTransition` for Non-Urgent State Updates

Pagination, deferred rendering, and non-critical updates are wrapped in `startTransition`.

```tsx
const onLoadMore = () => {
  startTransition(() => {
    fetchMore({ variables: { page: nextPage } })
  })
}
```

### React Router — `useSuspenseQuery` Pattern at Route Level

Route data is fetched with Suspense-compatible hooks. Loading is handled by `<Suspense>` boundaries outside the component.

```tsx
// Route component
export function RouteComponent() {
  const { data } = useSuspenseQuery(QUERY, { variables })
  return <PostsList posts={data.posts} />
}

// Parent wrapping with Suspense:
<Suspense fallback={<Skeleton.Post />}>
  <RouteComponent />
</Suspense>
```

---

## 10. TypeScript Patterns

### String Union Types Over Enums (Primary)

```ts
type ButtonSizes = 'xs' | 'sm' | 'base' | 'lg'
type ButtonVariants = 'primary' | 'outline' | 'origin'
type ModalType = 'login' | 'register'
```

### TypeScript Enums for Domain Values

Use `enum` only when values represent a semantic domain (e.g., mapped from an external source).

```ts
enum MediaType {
  Square = 'Square',
  Portrait = 'Portrait',
  Landscape = 'Landscape',
}
```

### `as const` for Constant Objects

```ts
export const STORAGE_KEYS = {
  AUTH_TOKEN: '__app_token__',
  USER_LOCATION: '__app_location__',
} as const
```

### `typeof array[number]` for Array-Derived Types

```tsx
const tabs = ['for you', 'media', 'rooms'] as const
type TabType = (typeof tabs)[number]
```

### Generic Hooks

```ts
const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): [T | undefined, (value: T) => void] => { ... }
```

### Global Types in `@types/index.d.ts`

```ts
declare global {
  type Icon = React.FC<React.SVGProps<SVGSVGElement>>
}
```

### Switch Statements Use Return, Not Break

Every `case` returns from inside a `{}` block. No `break` statements.

```ts
switch (variant) {
  case 'primary': {
    return 'text-white bg-primary-600'
  }
  case 'outline': {
    return 'text-primary-600 border border-primary-600'
  }
  default: {
    return 'text-white bg-primary-600'
  }
}
```

---

## 11. Error Handling

### Try/Catch with Toast in Async Handlers

```tsx
const handleSubmit = async () => {
  invariant(user, 'Unauthenticated')
  try {
    await doSomething()
    curiousToast.success('Done')
  } catch (error: unknown) {
    const err = toErrorWithMessage(error)
    curiousToast.error(err.message)
  }
}
```

### `error: unknown` in All Catch Blocks

Never type catch errors as `any`. Always `error: unknown`, cast with `toErrorWithMessage`.

### React Router Error Boundaries via `throw new Response`

```tsx
if (isGraphQLError(error)) {
  throw new Response(error.message, { status: 500 })
}
```

### Loading States via Suspense + Skeleton

No inline loading spinners. Use `<Suspense>` with skeleton fallbacks.

```tsx
<Suspense fallback={<Skeleton.TileList tileCount={3} />}>
  <PostsFeed />
</Suspense>
```

---

## 12. Miscellaneous

### Spread `...rest` for Prop Forwarding

```tsx
const InputText = ({ className, type = 'text', ...rest }: InputTextProps) => (
  <input className={clsxm('...')} type={type} {...rest} />
)
```

### Optional Chaining and Nullish Coalescing

Preferred over explicit null checks.

```tsx
disabled={disabled ?? isLoading}
type={type ?? 'button'}
onAction?.()
value={options?.[0]}
```

### `lazy` + `Suspense` for Heavy Components

```tsx
const NsfwContent = lazy(
  () => import('@/components/post/nsfw-content'),
)
const PostCanvas = lazy(
  () => import('@/components/canvas/post-canvas'),
)
```

### JSDoc on Public Component API (Single Line)

```tsx
/**
 * Button component used for any actions.
 */
export const Button = ({ ... }: ButtonProps) => (...)
```

### Comments Are Sparse

Only comment non-obvious logic. Never explain what the code does — only *why* when genuinely needed.

### Helper Functions Are Pure and Live in `utils/helpers.ts`

```ts
// src/components/ui/button/utils/helpers.ts
export function buttonVariants(variant?: ButtonVariants): string {
  switch (variant) {
    case 'primary': { return '...' }
    default: { return '...' }
  }
}
```

### `data-testid` for Test Selectors (Not Class Names or ARIA)

```tsx
<span data-testid="avatar-container" />
```
