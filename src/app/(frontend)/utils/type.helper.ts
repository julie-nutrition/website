import { isValidElement, PropsWithChildren, ReactElement, ReactNode } from 'react'

/**
 * Represents a component that can be rendered as passed child or as a default component.
 *
 * When `asChild` is `false`, the default component is used, and its properties can be passed directly to the host component.
 * When `asChild` is truthy, the child is used as the component. The host component no longer accepts the default props, and the component properties are passed directly to the child.
 */
export type AsChild<DefaultProps = Record<string, unknown>> =
  | ({ asChild?: false } & DefaultProps)
  | ({ asChild: true } & PropsWithChildren)

/**
 * Type guard to check if we are using the default component (not asChild or actionAsChild).
 * @param discriminant Used to discriminate between default and child rendering (mostly asChild props).
 * @param props The rest of the destructured props intersection. All common props must be extracted from this object.
 * @returns Wether or not we are using the default component.
 */

export function isDefaultComponent<T extends Record<string, unknown>>(
  discriminant: boolean | undefined,
  props: {} | T,
): props is T {
  return discriminant !== true
}

export function hasChildren(node: ReactNode): node is ReactElement<PropsWithChildren> {
  return isValidElement<PropsWithChildren>(node) && node.props.children != null
}
