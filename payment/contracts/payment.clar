;; title: payment
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions
;;

;; read only functions
;;

;; private functions
;;

(define-constant PRICE u1000000) ;; 1 STX = 1_000_000 microstacks

;; Map to store user principal and block height of payment
(define-map paid-users principal uint)

;; Public function to pay for access
(define-public (pay-for-access)
  (let ((payment-amount (stx-get-balance tx-sender)))
    (begin
      ;; Transfer the payment amount to the contract
      (try! (stx-transfer? PRICE tx-sender (as-contract tx-sender)))
      ;; Record the payment
      (map-set paid-users tx-sender stacks-block-height)
      (ok true)
    )
  )
)

;; Check if a user has access
(define-read-only (has-access (user principal))
  (is-some (map-get? paid-users user))
)
