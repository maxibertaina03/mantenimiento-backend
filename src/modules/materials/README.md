# Bounded Context · Materials

Materiales con **stock por cantidad** y movimientos auditados.

## Invariantes

- `stock >= 0` **siempre** (garantizado tanto en dominio como en la transacción de DB).
- Cada movimiento es **inmutable**: una vez creado no se edita; los errores se corrigen con un movimiento de tipo `ADJUSTMENT`.
- `stockAfter` se calcula y persiste como snapshot — permite reconstruir el stock histórico sin agregar todos los movimientos.

## Tipos de movimiento

| Tipo          | Efecto sobre stock | Ejemplo                                     |
| ------------- | ------------------ | ------------------------------------------- |
| `INBOUND`     | +                  | Compra, devolución de cliente               |
| `OUTBOUND`    | −                  | Venta, transferencia a otra sucursal        |
| `ADJUSTMENT` | + ó −              | Corrección de inventario por toma física   |
| `CONSUMPTION`| −                  | Uso interno en un mantenimiento u operación |

## Transaccionalidad

`RegisterMovement` debe correr en `prisma.$transaction([])`:

1. `SELECT … FOR UPDATE` del Material (o `update` con incremento atómico).
2. Validar `stock >= 0`.
3. Insertar `StockMovement` con `stockAfter`.
4. Disparar `AuditWriter.write({ action: STOCK_MOVEMENT, ... })`.
