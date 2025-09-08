;; title: temp
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

;; ;; Coin Flip Smart Contract in Clarity

;; Function to flip the coin
;; The "block-height" and "tx-sender" are used together to create some unpredictability
;; Coin Flip Smart Contract in Clarity


(define-public (check_vote (age uint)) 
  (begin
    (if (> age u17)
            (ok true)
            (err false)
    )
  )
)


;; (define-public (check_vote (age uint))
;;   (begin
;;     (if (> age u17)
;;         (ok true)
;;         (err false)
;;     )
;;   )
;; )