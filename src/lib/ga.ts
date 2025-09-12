export function gtag(...args: any[]) {
  if (typeof window === "undefined") return;
  const fn: any = (window as any).gtag;
  if (typeof fn === "function") fn(...args);
}

export function viewItem(p: { id: string; name: string; category?: string; price: number }) {
  gtag("event", "view_item", {
    currency: "USD",
    value: p.price,
    items: [
      {
        item_id: p.id,
        item_name: p.name,
        item_category: p.category,
        price: p.price
      }
    ]
  });
}

export function addToCart(p: { id: string; name: string; category?: string; price: number; quantity: number }) {
  gtag("event", "add_to_cart", {
    currency: "USD",
    value: p.price * p.quantity,
    items: [
      {
        item_id: p.id,
        item_name: p.name,
        item_category: p.category,
        price: p.price,
        quantity: p.quantity
      }
    ]
  });
}

export function beginCheckout(items: { id: string; name: string; category?: string; price: number; quantity: number }[]) {
  gtag("event", "begin_checkout", {
    currency: "USD",
    value: items.reduce((v, i) => v + i.price * i.quantity, 0),
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      item_category: i.category,
      price: i.price,
      quantity: i.quantity
    }))
  });
}

export function viewCart(items: { id: string; name: string; category?: string; price: number; quantity: number }[]) {
  gtag("event", "view_cart", {
    currency: "USD",
    value: items.reduce((v, i) => v + i.price * i.quantity, 0),
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      item_category: i.category,
      price: i.price,
      quantity: i.quantity
    }))
  });
}
