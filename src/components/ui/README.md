# Modal and BottomSheet Components

This directory contains reusable modal and bottom sheet components built with modern third-party libraries for better accessibility, performance, and user experience.

## Components Overview

### 1. Modal Component (`Modal.tsx`)
A desktop-focused modal component built with **Radix UI Dialog**.

**Features:**
- Full accessibility support (ARIA, keyboard navigation)
- Customizable sizes (sm, md, lg, xl, full)
- Optional close button and overlay click handling
- Dark mode support
- Smooth animations

**Usage:**
```tsx
import Modal from '@/components/ui/Modal';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="My Modal Title"
      description="Optional description"
      size="md"
      showCloseButton={true}
      closeOnOverlayClick={true}
    >
      <p>Modal content goes here</p>
    </Modal>
  );
}
```

### 2. BottomSheet Component (`BottomSheet.tsx`)
A mobile-focused bottom sheet component built with **Vaul**.

**Features:**
- Native swipe gestures for dismissal
- Snap points support
- Customizable handle indicator
- Smooth animations with spring physics
- Background scaling effect

**Usage:**
```tsx
import BottomSheet from '@/components/ui/BottomSheet';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <BottomSheet
      open={open}
      onOpenChange={setOpen}
      title="My Bottom Sheet"
      showHandle={true}
      dismissible={true}
      shouldScaleBackground={true}
    >
      <p>Bottom sheet content goes here</p>
    </BottomSheet>
  );
}
```

### 3. ModalBottomSheet Component (`ModalBottomSheet.tsx`)
A responsive component that automatically chooses between Modal (desktop) and BottomSheet (mobile).

**Features:**
- Automatic responsive behavior
- Unified API for both desktop and mobile
- Customizable breakpoint (default: 768px)
- Hydration-safe rendering

**Usage:**
```tsx
import ModalBottomSheet from '@/components/ui/ModalBottomSheet';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ModalBottomSheet
      open={open}
      onOpenChange={setOpen}
      title="Responsive Modal/BottomSheet"
      modalSize="md"
      showHandle={true}
      dismissible={true}
      breakpoint={768}
    >
      <p>Content that works on both desktop and mobile</p>
    </ModalBottomSheet>
  );
}
```

## Props Reference

### Common Props (All Components)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controls the open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `children` | `React.ReactNode` | - | Content to display |
| `title` | `string` | - | Optional title |
| `description` | `string` | - | Optional description |
| `className` | `string` | - | Additional CSS classes for content |
| `overlayClassName` | `string` | - | Additional CSS classes for overlay |
| `contentClassName` | `string` | - | Additional CSS classes for content container |
| `showCloseButton` | `boolean` | `true` | Show/hide close button |

### Modal-Specific Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnOverlayClick` | `boolean` | `true` | Close modal when clicking overlay |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |

### BottomSheet-Specific Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHandle` | `boolean` | `true` | Show drag handle indicator |
| `snapPoints` | `(string \| number)[]` | - | Snap points for the sheet |
| `fadeFromIndex` | `number` | - | Index from which to start fading |
| `modal` | `boolean` | `true` | Whether to render as modal |
| `dismissible` | `boolean` | `true` | Whether sheet can be dismissed |
| `shouldScaleBackground` | `boolean` | `true` | Scale background when open |

### ModalBottomSheet-Specific Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modalSize` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Size for desktop modal |
| `breakpoint` | `number` | `768` | Breakpoint for mobile/desktop switch |

## Dependencies

These components require the following packages:

```bash
npm install @radix-ui/react-dialog vaul framer-motion
```

- **@radix-ui/react-dialog**: Provides accessible modal functionality
- **vaul**: Provides smooth bottom sheet implementation
- **framer-motion**: Used by vaul for animations

## Best Practices

1. **Use ModalBottomSheet for most cases** - It provides the best user experience across all devices
2. **Keep content concise** - Especially for mobile bottom sheets
3. **Provide meaningful titles** - Helps with accessibility
4. **Test on both desktop and mobile** - Ensure the experience is smooth on all devices
5. **Use appropriate sizes** - Don't make modals too large on desktop

## Examples in the Project

See these files for real-world usage examples:
- `/src/app/inquiry/page.tsx` - Inquiry result modal
- `/src/components/sections/InquirySection.tsx` - Inquiry section modal

## Accessibility

All components follow accessibility best practices:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Customization

The components use Tailwind CSS classes and can be customized by:
1. Passing custom `className` props
2. Modifying the component source code
3. Using CSS custom properties for theming